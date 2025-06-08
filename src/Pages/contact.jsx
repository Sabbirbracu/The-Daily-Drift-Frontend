import emailjs from "emailjs-com";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast"; // <-- import toast
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const contactDetails = [
  { title: "Email", value: "sabbirahmad653@gmail.com" },
  { title: "Phone", value: "+8801304867542" },
  { title: "Address", value: "12 no road, DIT Project, Merul Badda, Dhaka." },
  { title: "Working Hours", value: "Sunday – Thursday: 9:00 AM – 6:00 PM" },
];

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6rq5r7d",
        "template_qoo6p5a",
        formRef.current,
        "CrDGy6DMvDFw1Dk3M"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully! We'll get back to you soon.");
          formRef.current.reset();
        },
        (error) => {
          toast.error("Failed to send the message. Please try again later.");
          console.error(error.text);
        }
      );
  };

  return (
    <section>
      {/* react-hot-toast Toaster component — put it near root or inside this component */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center py-24 px-4 md:px-6 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-300">
            We'd love to hear from you — let's connect and create something amazing together.
          </p>
        </div>
        <div className="pt-[30%] md:pt-[20%] lg:pt-[15%]"></div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Whether you have a question, feedback, or just want to say hello — we’d love to hear from you.
            </p>
            <div className="space-y-6">
              {contactDetails.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-10">
              <a
                href="https://www.facebook.com/sabbir.ahmad.443854/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-500 transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sabbirahmad653/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-300 transition"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium" htmlFor="user_name">
                  Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
