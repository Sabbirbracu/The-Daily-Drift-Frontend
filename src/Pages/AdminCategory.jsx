import { useState } from "react";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from "../features/category/categoryApi";

import { toast } from "react-hot-toast";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Table from "../components/table";

const Category = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Table column headers
  const columns = ["Name", "Actions"];

  // Transform categories data
  const tableData = categories
    ? categories.map(({ _id, name }) => ({
        id: _id,
        name,
      }))
    : [];

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      return toast.error("Category name cannot be empty");
    }
    try {
      await createCategory({ name: newCategoryName }).unwrap();
      toast.success("Category added successfully");
      setNewCategoryName("");
    } catch (err) {
      toast.error(err.data?.message || "Failed to create category");
    }
  };

  // Update an existing category
  const handleUpdateCategory = async (id) => {
    if (!editingName.trim()) {
      return toast.error("Category name cannot be empty");
    }
    try {
      await updateCategory({ id, name: editingName }).unwrap();
      toast.success("Category updated successfully");
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update category");
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (err) {
        toast.error(err.data?.message || "Failed to delete category");
      }
    }
  };

  // Action buttons per row
  const renderActions = (row) => {
    if (editingId === row.id) {
      return (
        <>
          <Button
            label={updating ? "Saving..." : "Save"}
            onClick={() => handleUpdateCategory(row.id)}
            className="mr-2 px-3 py-1 text-sm"
            disabled={updating || !editingName.trim()}
          />
          <Button
            label="Cancel"
            onClick={() => {
              setEditingId(null);
              setEditingName("");
            }}
            className="bg-gray-600 px-3 py-1 text-sm"
          />
        </>
      );
    }
    return (
      <>
        <Button
          label="Edit"
          onClick={() => {
            setEditingId(row.id);
            setEditingName(row.name);
          }}
          className="mr-2 bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700"
        />
        <Button
          label={deleting ? "Deleting..." : "Delete"}
          onClick={() => handleDeleteCategory(row.id)}
          className="bg-red-700 px-3 py-1 text-sm hover:bg-red-800"
          disabled={deleting}
        />
      </>
    );
  };

  // Show loading or error states
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-red-600 p-4 text-center">
        Failed to load categories.
      </p>
    );

  // Prepare table row data, fixing text color in inputs and cells for dark mode
  const rows = tableData.map((row) => ({
    id: row.id,
    name:
      editingId === row.id ? (
        <input
          type="text"
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          className="px-2 py-1 border rounded-md w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={updating}
          autoFocus
        />
      ) : (
        <span className="text-white">{row.name}</span>
      ),
    actions: renderActions(row),
  }));

  return (
    <div className="p-6 md:p-10 bg-gray-900 min-h-screen rounded-md text-white  mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400">
        Manage Categories
      </h1>

      {/* New category input */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center">
        <input
          type="text"
          placeholder="Enter a new category name"
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          disabled={creating}
        />
        <Button
          label={creating ? "Adding..." : "Add Category"}
          onClick={handleAddCategory}
          disabled={creating || !newCategoryName.trim()}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div>
        <Table columns={columns} data={rows} style="dark" />
      </div>
    </div>
  );
};

export default Category;
