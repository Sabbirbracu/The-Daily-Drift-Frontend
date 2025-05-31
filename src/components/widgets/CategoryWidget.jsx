import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import Spinner from "../Spinner"; // Assuming you have a spinner component

const CategoryWidget = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-500 p-4">Failed to load categories.</p>;

  // Filter categories with count > 0
  const filteredCategories = categories?.filter((cat) => cat.count > 0) || [];

  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white shadow">
      <h4 className="text-lg font-semibold mb-4">📂 Categories</h4>
      {filteredCategories.length === 0 ? (
        <p className="text-gray-400">No categories available.</p>
      ) : (
        <ul className="space-y-2">
          {filteredCategories.map((cat) => (
            <Link
              to={`/category/${cat.name.toLowerCase()}`}
              key={cat._id}
              className="block"
            >
              <li className="flex justify-between items-center px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer">
                <span>{cat.name}</span>
                <span className="bg-gray-700 text-sm px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryWidget;
