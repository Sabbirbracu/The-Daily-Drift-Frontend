import React from "react";

const contactDetails = [
  {
    title: "Email",
    value: "contact@thedailydrift.com",
  },
  {
    title: "Phone",
    value1: "+880 1641858773",
    value2: "+880 1234 567 890",
    value3: "+880 1234 567 890",
  },
  {
    title: "Address",
    value: "Dhaka, Bangladesh",
  },
  {
    title: "Working Hours",
    value: "Sunday – Thursday: 9:00 AM – 6:00 PM",
  },
];

const Contact = () => {
  return (
    <section className="py-12 px-4 text-white bg-black-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactDetails.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
