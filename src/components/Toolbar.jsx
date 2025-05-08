import React from "react";

const Toolbar = ({ editor, handleImageUpload }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 border p-2 rounded-md bg-gray-100">
      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "font-bold text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "font-bold text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "font-bold text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        H3
      </button>

      {/* Text Styles */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "font-bold text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "italic text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Underline
      </button>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        1. List
      </button>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Justify
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Link
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Unlink
      </button>

      {/* Image Upload */}
      <button
        onClick={handleImageUpload}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Image
      </button>

      {/* Clear */}
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={
          editor.isActive("underline")
            ? "underline text-blue-600"
            : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
        }
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
