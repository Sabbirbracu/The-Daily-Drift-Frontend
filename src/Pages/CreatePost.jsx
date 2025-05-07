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
import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import { useCreatePostMutation } from "../features/post/postApi";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: "<p>Write your content here...</p>",
  });

  const [data, setData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImgToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "the_daily_drift");
    formData.append("cloud_name", "dvfxdetcl");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvfxdetcl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
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

  const uploadThum = async (e) => {
    const file = e.target.files[0];
    const thumImg = await uploadImgToCloudinary(file);
    if (thumImg) {
      setData((prevData) => ({
        ...prevData,
        image: thumImg,
      }));
    }
  };

  const handelSubmit = async () => {
    const content = editor.getHTML();
    setData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };

  useEffect(() => {
    console.log(data);
    createPost(data);
  }, [data.content]);

  if (!editor) return <div>Loading Editor...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto border rounded-md shadow-md bg-white text-black">
      <h2 className="text-2xl mb-4 font-bold">Create your post</h2>

      <div className="mb-5">
        <input
          type="text"
          name="title"
          placeholder="Enter Your Post Title"
          onChange={handleData}
          className="w-full focus-within:outline-0 border-2 px-2 py-0.5 rounded-md mb-2"
        />
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleData}
            className="w-full focus-within:outline-0 border-2 px-2 py-0.5 rounded-md mb-2"
          />
          <input
            type="file"
            placeholder="upload thumbnail"
            onChange={uploadThum}
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
            className="bg-red-400 px-2 py-1 rounded-md cursor-pointer"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Upload Thumbnail
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar editor={editor} handleImageUpload={handleImageUpload} />

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] rounded-md focus:outline-0"
      />

      {/* Submit */}
      <button
        onClick={handelSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
