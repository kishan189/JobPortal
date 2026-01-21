import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* --- Company Info --- */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">JobConnect</h2>
          <p className="text-sm leading-relaxed">
            Find your dream job or hire top talent. JobConnect connects professionals and companies worldwide.
          </p>
        </div>

        {/* --- For Job Seekers --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Seekers</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/jobs" className="hover:text-blue-600">Browse Jobs</Link></li>
            <li><Link to="/categories" className="hover:text-blue-600">Job Categories</Link></li>
            <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-600">Register</Link></li>
          </ul>
        </div>

        {/* --- For Employers --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Employers</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/post-job" className="hover:text-blue-600">Post a Job</Link></li>
            <li><Link to="/employer-dashboard" className="hover:text-blue-600">Employer Dashboard</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            <li><Link to="/support" className="hover:text-blue-600">Support</Link></li>
          </ul>
        </div>

        {/* --- Social & Contact --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-blue-600"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-600"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-blue-600"><Github size={20} /></a>
          </div>
          <p className="text-sm">contact@jobconnect.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>

      {/* --- Bottom --- */}
      <div className="border-t border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JobConnect. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
