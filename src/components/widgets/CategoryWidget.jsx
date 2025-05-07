const categories = [
    { name: "Travel", count: 3 },
    { name: "Technology", count: 2 },
    { name: "News", count: 3 },
    { name: "Food", count: 0 },
    { name: "Health", count: 3 },
  ];
  
  const CategoryWidget = () => {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-white shadow">
        <h4 className="text-lg font-semibold mb-4">📂 Categories</h4>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className="flex justify-between items-center px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
            >
              <span>{cat.name}</span>
              <span className="bg-gray-700 text-sm px-2 py-0.5 rounded-full">{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CategoryWidget;
  


