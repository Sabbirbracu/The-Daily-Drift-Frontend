
const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-gray-900 text-gray-100 rounded-lg shadow-lg my-12">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">
        Terms and Conditions
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          Welcome to The Daily Drift. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of the Platform</h2>
        <p className="text-gray-300 leading-relaxed mb-2">
          You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Any misuse or unauthorized use may result in termination of access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Content</h2>
        <p className="text-gray-300 leading-relaxed">
          You retain ownership of any content you submit but grant us a license to use, modify, and display it on our platform. Content must not violate any laws or third-party rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
        <p className="text-gray-300 leading-relaxed">
          All content and materials on this platform are protected by intellectual property laws and belong to The Daily Drift or its licensors.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-300 leading-relaxed">
          We provide the platform “as is” without warranties of any kind. We are not liable for any damages arising from the use or inability to use the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          We reserve the right to update these Terms and Conditions at any time. Continued use after changes means acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have questions or concerns about these Terms, please contact us at <a href="mailto:support@thedailydrift.com" className="text-yellow-400 underline">support@thedailydrift.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
