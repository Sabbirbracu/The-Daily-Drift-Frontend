// import React from "react";

// const Toolbar = ({ editor, handleImageUpload }) => {
//   if (!editor) return null;

//   return (
//     <div className="flex flex-wrap gap-2 mb-4 border p-2 rounded-md bg-gray-100">
//       {/* Headings */}
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={
//           editor.isActive("heading", { level: 1 })
//             ? "font-bold text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         H1
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={
//           editor.isActive("heading", { level: 2 })
//             ? "font-bold text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         H2
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={
//           editor.isActive("heading", { level: 3 })
//             ? "font-bold text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         H3
//       </button>

//       {/* Text Styles */}
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={
//           editor.isActive("bold")
//             ? "font-bold text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Bold
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={
//           editor.isActive("italic")
//             ? "italic text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Italic
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Underline
//       </button>

//       {/* Lists */}
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={
//           editor.isActive("bulletList")
//             ? "text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         • List
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={
//           editor.isActive("orderedList")
//             ? "text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         1. List
//       </button>

//       {/* Alignment */}
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("left").run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Left
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("center").run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Center
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("right").run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Right
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Justify
//       </button>

//       {/* Link */}
//       <button
//         onClick={() => {
//           const url = window.prompt("Enter URL:");
//           if (url) {
//             editor.chain().focus().setLink({ href: url }).run();
//           }
//         }}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Link
//       </button>
//       <button
//         onClick={() => editor.chain().focus().unsetLink().run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Unlink
//       </button>

//       {/* Image Upload */}
//       <button
//         onClick={handleImageUpload}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Image
//       </button>

//       {/* Clear */}
//       <button
//         onClick={() => editor.chain().focus().clearNodes().run()}
//         className={
//           editor.isActive("underline")
//             ? "underline text-blue-600"
//             : "bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 active:scale-95 transition-all"
//         }
//       >
//         Clear
//       </button>
//     </div>
//   );
// };

// export default Toolbar;

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2Off,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline
} from "lucide-react";

const Toolbar = ({ editor, handleImageUpload }) => {
  if (!editor) return null;

  const buttonClass = (active) =>
    `${active ? "text-blue-600" : "text-black"} bg-gray-200 p-2 rounded-md hover:bg-gray-300 active:scale-95 transition-all`;

  return (
    <div className="flex flex-wrap gap-2 mb-4 border p-2 rounded-md bg-gray-100 justify-start">
      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      {/* Text Styles */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive("bold"))} title="Bold">
        <Bold size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive("italic"))} title="Italic">
        <Italic size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClass(editor.isActive("underline"))} title="Underline">
        <Underline size={18} />
      </button>

      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive("bulletList"))} title="Bullet List">
        <List size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive("orderedList"))} title="Ordered List">
        <ListOrdered size={18} />
      </button>

      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={buttonClass(editor.isActive({ textAlign: "left" }))} title="Align Left">
        <AlignLeft size={18} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={buttonClass(editor.isActive({ textAlign: "center" }))} title="Align Center">
        <AlignCenter size={18} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={buttonClass(editor.isActive({ textAlign: "right" }))} title="Align Right">
        <AlignRight size={18} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={buttonClass(editor.isActive({ textAlign: "justify" }))} title="Justify">
        <AlignJustify size={18} />
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={buttonClass(editor.isActive("link"))}
        title="Add Link"
      >
        <LinkIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        className={buttonClass(false)}
        title="Remove Link"
      >
        <Link2Off size={18} />
      </button>

      {/* Image Upload */}
      <button
        onClick={handleImageUpload}
        className={buttonClass(false)}
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </button>

      {/* Clear */}
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={buttonClass(false)}
        title="Clear Formatting"
      >
        <Eraser size={18} />
      </button>
    </div>
  );
};

export default Toolbar;
