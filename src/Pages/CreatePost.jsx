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

const CreatePost = ({ post = null }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [data, setData] = useState({
    title: "",
    category: "",
    image: "",
    content: "<p>Write your content here...</p>",
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
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
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

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedImage = await uploadImgToCloudinary(file);
    if (uploadedImage) {
      setData((prev) => ({ ...prev, image: uploadedImage }));
    }
  };

  const handleSubmit = async () => {
    if (!editor) return;
    try {
      const content = editor.getHTML();
      const finalData = { ...data, content };
      setData(finalData);
      let result;
      if (post) {
        console.log("🚀 ~ CreatePost ~ post:", post._id);
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
        });
        editor.commands.setContent("<p>Write your content here...</p>");
        console.log(
          post ? "post created successfully" : "post updated successfully"
        );
        navigate(`/dashboard-${user.role}/post`);
      } else {
        console.log("post create fail");
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
      });
      if (editor) {
        editor.commands.setContent(post.content);
      }
    }
  }, [post, editor]);

  if (!editor) return <div>Loading Editor...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto border rounded-md shadow-md bg-white text-black">
      <h2 className="text-2xl mb-4 font-bold">Create your post</h2>

      <div className="mb-5">
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="Enter Your Post Title"
          onChange={handleInputChange}
          className="w-full border-2 px-2 py-1 rounded-md mb-2"
        />

        <input
          type="text"
          name="category"
          value={data.category}
          placeholder="Category"
          onChange={handleInputChange}
          className="w-full border-2 px-2 py-1 rounded-md mb-2"
        />

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
            className="w-20 mb-2 rounded-lg"
          />
        )}

        <button
          type="button"
          className="bg-red-400 px-2 py-1 rounded-md cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Thumbnail
        </button>
      </div>

      <Toolbar editor={editor} handleImageUpload={handleImageUpload} />

      <EditorContent
        editor={editor}
        className=" tiptap min-h-[150px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-transparent"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Submiting...." : "Submit"}
      </button>
    </div>
  );
};

export default CreatePost;
