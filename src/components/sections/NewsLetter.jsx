import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useSubscribeToNewsletterMutation } from "../../features/newsletter/newsletterApi";


const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [subscribeToNewsletter, { isLoading }] = useSubscribeToNewsletterMutation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email) {
        toast.error("Please enter a valid email!");
        return;
      }
  
      try {
        await subscribeToNewsletter(email).unwrap();
        toast.success("Subscribed successfully!");
        setEmail("");
      } catch (error) {
        toast.error("Failed to subscribe. Please try again.");
      }
    };  

    return (
    <div
      className="bg-cover bg-center bg-no-repeat relative py-20 px-4 text-white"
      style={{ backgroundImage: "url('/newsLetterBG.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Newsletter</h2>
        <p className="text-lg mb-6">
          Subscribe to Our Newsletter and Stay Updated
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-l-md text-white placeholder-white bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-text"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-r-md"
          >
            <FaPaperPlane className="text-white text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
