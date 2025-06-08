
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-gray-900 text-gray-100 rounded-lg shadow-lg my-12">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">
        Privacy Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          At The Daily Drift, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <p className="text-gray-300 leading-relaxed mb-2">
          We may collect personal information such as your name, email address, and any content you submit while using our platform.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We also collect non-personal data such as browser type, device information, and usage statistics to improve our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p className="text-gray-300 leading-relaxed">
          Your information helps us to:
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            <li>Provide and maintain our platform</li>
            <li>Improve user experience and develop new features</li>
            <li>Communicate important updates and respond to inquiries</li>
            <li>Ensure security and prevent misuse</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
        <p className="text-gray-300 leading-relaxed">
          We do not sell or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating the platform under confidentiality agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
        <p className="text-gray-300 leading-relaxed">
          We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
        <p className="text-gray-300 leading-relaxed">
          You have the right to access, correct, or delete your personal data. To exercise these rights or for any privacy-related questions, please contact us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the platform after changes means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          For any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:support@thedailydrift.com" className="text-yellow-400 underline">
            support@thedailydrift.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
