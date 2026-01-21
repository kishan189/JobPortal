import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to <span className="font-medium text-blue-600">JobConnect</span>. 
            Your privacy is very important to us. This Privacy Policy explains how we collect, 
            use, and protect your personal information when you use our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect personal information that you provide directly to us, such as:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Name, email address, and phone number</li>
            <li>Resume or CV details</li>
            <li>Employment preferences and skills</li>
            <li>Account login credentials</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Connect job seekers with employers</li>
            <li>Improve and personalize our platform experience</li>
            <li>Send important updates, job alerts, and notifications</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Data Sharing & Disclosure</h2>
          <p className="leading-relaxed">
            We do not sell your personal data. However, we may share your information with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Employers who post jobs on our platform</li>
            <li>Service providers that help us operate our platform</li>
            <li>Law enforcement, when required by law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Data Security</h2>
          <p className="leading-relaxed">
            We implement industry-standard security measures to protect your personal data 
            from unauthorized access, alteration, or disclosure. However, no online 
            system is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Your Rights</h2>
          <p className="leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access, update, or delete your account information</li>
            <li>Withdraw consent for data processing</li>
            <li>Request details about data we hold about you</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy periodically. Updates will be reflected 
            with a new “Last updated” date. Please check this page regularly for any changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:  
            <br />
            <span className="font-medium text-blue-600">
              privacy@jobconnect.com
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
