import Button from "./Button";
import "/Users/sabbirahmad/The Daily Drift/frontend/src/index.css";

const Navbar = ()=>{
    const categories = ["Movies", "Games", "Tech", "Sports", "News", "Music", "Art", "Food"];
    return(
        <nav className="bg-gray-700 text-white py-2.5 px-7 flex justify-between items-center content-font ">
            <div className="text-3xl font-bold primary-font text-white">The Daily Drift</div>

            <ul className="flex gap-4">
                {categories.map((category) => (
                    <li key={category} className="hover:text-red-500 cursor-pointer transition">
                    {category}
                    </li>
                ))}
                <li className="hover:text-red-500 cursor-pointer transition">Contact Us</li>
            </ul>

            <Button label="Login" onClick={() => alert("Login clicked")} className="HeaderButton"/>
        </nav>
    )
};

export default Navbar;