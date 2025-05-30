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
import { useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import useAuth from "../features/auth/hooks/useAuth";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../features/post/postApi";
import '/Users/sabbirahmad/The Daily Drift/frontend/src/editorStyles.css';


const TOP_CATEGORIES = [
  "Technology",
  "Health",
  "Education",
  "Business",
  "Entertainment",
  "Travel",
  "Finance",
  "Food",
  "Lifestyle",
  "Sports",
];

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

  const handleSubmit = async () => {
    if (!editor) return;
    try {
      const content = editor.getHTML();
      const finalData = { ...data, content };
      setData(finalData);
      let result;
      if (post) {
        result = await updatePost({ id: post._id, ...finalData }).unwrap();
      } else {
        result = await createPost(finalData).unwrap();
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
      console.log(error);
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

  if (!editor) return <div>Loading Editor...</div>;

  return (
    // <div className="p-6 max-w-4xl mx-auto border rounded-md shadow-md bg-white text-black">
    //   <h2 className="text-3xl font-semibold mb-6">{post ? "Update" : "Create"} Your Post</h2>

    //   <div className="grid grid-cols-1 gap-4">
    //     <input
    //       type="text"
    //       name="title"
    //       value={data.title}
    //       placeholder="Enter Post Title"
    //       onChange={handleInputChange}
    //       className="border p-2 rounded-md"
    //     />

    //     <select
    //       name="category"
    //       value={data.category}
    //       onChange={handleInputChange}
    //       className="border p-2 rounded-md"
    //     >
    //       <option value="">Select Category</option>
    //       {TOP_CATEGORIES.map((cat) => (
    //         <option key={cat} value={cat}>
    //           {cat}
    //         </option>
    //       ))}
    //     </select>

    //     <input
    //       type="text"
    //       name="metaTitle"
    //       value={data.metaTitle}
    //       placeholder="Meta Title"
    //       onChange={handleInputChange}
    //       className="border p-2 rounded-md"
    //     />

    //     <textarea
    //       name="metaDescription"
    //       value={data.metaDescription}
    //       placeholder="Meta Description"
    //       rows={3}
    //       onChange={handleInputChange}
    //       className="border p-2 rounded-md"
    //     />

    //     <input
    //       type="text"
    //       name="tags"
    //       value={data.tags}
    //       placeholder="Tags (comma separated)"
    //       onChange={handleInputChange}
    //       className="border p-2 rounded-md"
    //     />

    //     <div className="space-y-2">
    //       <input
    //         ref={fileInputRef}
    //         type="file"
    //         onChange={handleThumbnailUpload}
    //         accept="image/*"
    //         className="hidden"
    //       />
    //       {data.image && (
    //         <img
    //           src={data.image}
    //           alt="Thumbnail"
    //           className="w-24 h-24 object-cover rounded"
    //         />
    //       )}
    //       <div className="flex items-center gap-3">
    //         <button
    //           type="button"
    //           className="bg-red-500 text-white px-3 py-1 rounded-md"
    //           onClick={() => fileInputRef.current?.click()}
    //         >
    //           Upload Thumbnail
    //         </button>
    //         {uploadProgress > 0 && uploadProgress < 100 && (
    //           <span className="text-sm text-gray-600">
    //             Uploading: {uploadProgress}%
    //           </span>
    //         )}
    //       </div>
    //     </div>

    //     <Toolbar editor={editor} handleImageUpload={handleImageUpload} />
    //     <EditorContent
    //       editor={editor}
    //       className="min-h-[200px] border p-3 rounded-md"
    //     />

    //     <div className="flex justify-between mt-4">
    //       <button
    //         onClick={() => navigate(-1)}
    //         className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
    //       >
    //         Cancel
    //       </button>

    //       <button
    //         onClick={handleSubmit}
    //         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    //       >
    //         {isLoading ? "Submitting..." : post ? "Update Post" : "Publish Post"}
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="p-6 max-w-4xl mx-auto border rounded-2xl shadow-lg bg-white text-black">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">
    {post ? "📝 Update Your Post" : "🆕 Create New Post"}
  </h2>

  <div className="grid grid-cols-1 gap-5">
    <input
      type="text"
      name="title"
      value={data.title}
      placeholder="Enter Post Title"
      onChange={handleInputChange}
      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
    />

    <select
      name="category"
      value={data.category}
      onChange={handleInputChange}
      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
    >
      <option value="">Select Category</option>
      {TOP_CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    <input
      type="text"
      name="metaTitle"
      value={data.metaTitle}
      placeholder="Meta Title"
      onChange={handleInputChange}
      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />

    <textarea
      name="metaDescription"
      value={data.metaDescription}
      placeholder="Meta Description"
      rows={3}
      onChange={handleInputChange}
      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="tags"
      value={data.tags}
      placeholder="Tags (comma separated)"
      onChange={handleInputChange}
      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />

    {/* Thumbnail Upload */}
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleThumbnailUpload}
        accept="image/*"
        className="hidden"
      />

      {data.image && (
        <img
          src={data.image}
          alt="Thumbnail"
          className="w-24 h-24 object-cover rounded-md border"
        />
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          {data.image ? "Change Thumbnail" : "Upload Thumbnail"}
        </button>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>

    {/* Text Editor Toolbar */}
    <div className="border rounded-lg p-3 shadow-sm">
      <Toolbar editor={editor} handleImageUpload={handleImageUpload} />
    </div>

    <EditorContent
      editor={editor}
      className="tiptap-editor min-h-[200px] border border-gray-300 p-4 rounded-lg focus:outline-none"
    />


    {/* Footer Buttons */}
    <div className="flex justify-between mt-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Cancel
      </button>

      <button
        onClick={handleSubmit}
        className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
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