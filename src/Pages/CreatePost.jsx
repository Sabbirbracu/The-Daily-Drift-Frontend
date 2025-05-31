import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; // Adjust path if needed
import Toolbar from "../components/Toolbar";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetCategoriesQuery } from "../features/category/categoryApi"; // adjust path as needed
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../features/post/postApi";
import '/Users/sabbirahmad/The Daily Drift/frontend/src/editorStyles.css';


const CreatePost = ({ post = null }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState({
    title: "",
    category: "",
    image: "",
    content: "<p>Write your content here...</p>",
    metaTitle: "",
    metaDescription: "",
    tags: "",
  });
  const { data: categoriesData, isLoading: isCategoriesLoading, error } = useGetCategoriesQuery();
  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: data.content || "<p>Write your content here...</p>",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImgToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloudName);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      const promise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        };
        xhr.onerror = () => reject("Upload failed");
        xhr.send(formData);
      });

      return await promise;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedImage = await uploadImgToCloudinary(file);
    if (uploadedImage) {
      setData((prev) => ({ ...prev, image: uploadedImage }));
    }
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await uploadImgToCloudinary(file);
        if (imageUrl) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      }
    };
    input.click();
  };

  // const handleSubmit = async () => {
  //   if (!editor) return;
  //   try {
  //     const content = editor.getHTML();
  //     const finalData = { ...data, content };
  //     setData(finalData);
  //     let result;
  //     if (post) {
  //       result = await updatePost({ id: post._id, ...finalData }).unwrap();
  //     } else {
  //       result = await createPost(finalData).unwrap();
  //     }
  //     if (result) {
  //       setData({
  //         title: "",
  //         category: "",
  //         image: "",
  //         content: "",
  //         metaTitle: "",
  //         metaDescription: "",
  //         tags: "",
  //       });
  //       editor.commands.setContent("<p>Write your content here...</p>");
  //       navigate(`/dashboard-${user.role}/post`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async () => {
  if (!editor) return;

  try {
    const content = editor.getHTML();
    const finalData = { ...data, content };
    setData(finalData);

    let result;
    if (post) {
      toast.loading("Updating post...");
      result = await updatePost({ id: post._id, ...finalData }).unwrap();
      toast.dismiss();
      toast.success("Post updated successfully!");
    } else {
      toast.loading("Publishing post...");
      result = await createPost(finalData).unwrap();
      toast.dismiss();
      toast.success("Post published successfully!");
    }

    if (result) {
      setData({
        title: "",
        category: "",
        image: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        tags: "",
      });
      editor.commands.setContent("<p>Write your content here...</p>");
      navigate(`/dashboard-${user.role}/post`);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Something went wrong. Try again!");
    console.error(error);
  }
};

  useEffect(() => {
    if (post) {
      setData({
        title: post.title,
        category: post.category,
        image: post.image,
        content: post.content,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        tags: post.tags || "",
      });
      if (editor) {
        editor.commands.setContent(post.content);
      }
    }
  }, [post, editor]);

  if (!editor) return  <Spinner />; // Ensure editor is initialized before rendering
  if (isLoading) return <Spinner />;


  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm">
            ✍️
          </span>
          {post ? "Update Post" : "Create New Post"}
        </h2>
        {/* Add a collapse toggle here if you want for mobile UX */}
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="Post Title"
          onChange={handleInputChange}
          className="w-full px-3 py-2 sm:py-2.5 text-base border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />

        {/* Category */}
        <select
        name="category"
        value={data.category}
        onChange={handleInputChange}
        className="w-full px-3 py-2 sm:py-2.5 text-base border rounded-md border-gray-300 text-white focus:ring-2 focus:ring-indigo-500"
        disabled={isCategoriesLoading}
      >
        <option value="">Select Category</option>

        {/* Render categories dynamically */}
        {categoriesData && categoriesData.length > 0 ? (
          categoriesData.map((cat) => (
            <option key={cat._id || cat.id || cat.name} value={cat.name || cat.title || cat}>
              {cat.name || cat.title || cat}
            </option>
          ))
        ) : (
          !isCategoriesLoading && <option disabled>No categories found</option>
        )}
      </select>


        {/* Meta Title */}
        <input
          type="text"
          name="metaTitle"
          value={data.metaTitle}
          placeholder="Meta Title"
          onChange={handleInputChange}
          className="w-full px-3 py-2 text-base border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />

        {/* Meta Description */}
        <textarea
          name="metaDescription"
          value={data.metaDescription}
          placeholder="Meta Description"
          rows={2}
          onChange={handleInputChange}
          className="w-full px-3 py-2 text-base border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 resize-none"
        />

        {/* Tags */}
        <input
          type="text"
          name="tags"
          value={data.tags}
          placeholder="Tags (comma separated)"
          onChange={handleInputChange}
          className="w-full px-3 py-2 text-base border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          {data.image && (
            <img
              src={data.image}
              alt="Thumbnail Preview"
              className="w-28 h-28 object-cover rounded-md border"
            />
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md shadow-sm"
            >
              {data.image ? "Change Thumbnail" : "Upload Thumbnail"}
            </button>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full sm:max-w-xs h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleThumbnailUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Editor */}
        <div className="border border-gray-300 rounded-md p-4">
          <Toolbar editor={editor} handleImageUpload={handleImageUpload} />
          <div className="border-1 rounded-md border-b-blue-50">
            <EditorContent
            editor={editor}
            className="tiptap-editor mt-2 min-h-[160px] px-2 py-1 focus:outline-none text-sm"
          />
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2 text-sm font-medium text-white rounded-md shadow-sm transition ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : post ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>


);
};

export default CreatePost;