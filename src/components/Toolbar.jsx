import React from "react";

const Toolbar = ({ editor, handleImageUpload }) => (
  <div className="flex flex-wrap gap-2 mb-2">
    {[
      { label: "Undo", action: () => editor.chain().focus().undo().run() },
      { label: "Redo", action: () => editor.chain().focus().redo().run() },
      {
        label: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        action: () => editor.chain().focus().toggleUnderline().run(),
      },
      {
        label: "Bullet List",
        action: () => editor.chain().focus().toggleBulletList().run(),
      },
      {
        label: "Numbered List",
        action: () => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        label: "Code",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
      },
      { label: "Add Image", action: handleImageUpload },
      {
        label: "Add Table",
        action: () =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run(),
      },
    ].map((btn, idx) => (
      <button key={idx} onClick={btn.action} className="toolbar-btn">
        {btn.label}
      </button>
    ))}

    <select
      onChange={(e) => {
        const level = Number(e.target.value);
        editor
          .chain()
          .focus()
          [level === 0 ? "setParagraph" : "toggleHeading"]({ level })
          .run();
      }}
      className="toolbar-btn"
      defaultValue="0"
    >
      <option value="0">Paragraph</option>
      <option value="1">H1</option>
      <option value="2">H2</option>
      <option value="3">H3</option>
    </select>
  </div>
);

export default Toolbar;
