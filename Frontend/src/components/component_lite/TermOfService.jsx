import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

      <p className="mb-4 text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6">
        {/* 1. Introduction */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to <span className="font-medium text-blue-600">JobConnect</span>.  
            By accessing or using our website, mobile app, or services, you agree to comply with these Terms of Service.  
            Please read them carefully before using our platform.
          </p>
        </div>

        {/* 2. Use of the Platform */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Use of the Platform</h2>
          <p className="leading-relaxed">
            You agree to use the platform only for lawful purposes. You must not:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Post false, misleading, or offensive job listings or resumes</li>
            <li>Violate any local, national, or international laws</li>
            <li>Interfere with or disrupt the platform’s functionality</li>
          </ul>
        </div>

        {/* 3. User Accounts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. User Accounts</h2>
          <p className="leading-relaxed">
            When creating an account, you agree to provide accurate, current, and complete information.  
            You are responsible for maintaining the confidentiality of your login credentials 
            and all activities under your account.
          </p>
        </div>

        {/* 4. Job Listings and Applications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Job Listings and Applications</h2>
          <p className="leading-relaxed">
            Employers are solely responsible for the content of job postings.  
            Job seekers are responsible for ensuring that their applications and resumes 
            are truthful and up-to-date.  
            <span className="font-medium text-blue-600"> JobConnect</span> acts only as an intermediary 
            and does not guarantee employment.
          </p>
        </div>

        {/* 5. Intellectual Property */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Intellectual Property</h2>
          <p className="leading-relaxed">
            All content, trademarks, and materials on the platform are owned or licensed by 
            <span className="font-medium text-blue-600"> JobConnect</span>.  
            You may not copy, distribute, or reproduce any part of the platform 
            without prior written consent.
          </p>
        </div>

        {/* 6. Limitation of Liability */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Limitation of Liability</h2>
          <p className="leading-relaxed">
            <span className="font-medium text-blue-600">JobConnect</span> is not responsible for any 
            direct or indirect damages resulting from your use of the platform, 
            including job losses, data breaches, or communication failures.
          </p>
        </div>

        {/* 7. Termination */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Termination</h2>
          <p className="leading-relaxed">
            We reserve the right to suspend or terminate your account at any time 
            if you violate these terms or engage in harmful activities on the platform.
          </p>
        </div>

        {/* 8. Modifications to Terms */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Modifications to Terms</h2>
          <p className="leading-relaxed">
            We may update these Terms of Service periodically.  
            Changes will take effect immediately upon being posted on our website.  
            Please check this page regularly to stay informed.
          </p>
        </div>

        {/* 9. Contact Us */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions or concerns about these Terms of Service, please contact us at:  
            <br />
            <span className="font-medium text-blue-600">support@jobconnect.com</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
