const AuthorWidget = () => {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-white text-center shadow">
        <img
          src="/author.png"
          alt="Author"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Hi 👋 I Am Cameron Williamson</h3>
        <p className="text-sm text-gray-400 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full">
          Learn More
        </button>
      </div>
    );
  };
  
  export default AuthorWidget;
  