import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="LMS Logo" className="w-14 h-14" />
          <span className="font-semibold text-gray-800"></span>
        </div>

        {/* Middle: Navigation */}
        <div className="flex gap-6 text-gray-600">
          <a href="/educator" className="hover:text-indigo-600 transition">Dashboard</a>
          <a href="/educator/my-courses" className="hover:text-indigo-600 transition">My Courses</a>
          <a href="/educator/add-course" className="hover:text-indigo-600 transition">Add Course</a>
          <a href="/educator/student-enrolled" className="hover:text-indigo-600 transition">Students</a>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5 hover:opacity-70" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5 hover:opacity-70" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5 hover:opacity-70" />
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-gray-100 py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Edemy — Built  for Educators
      </div>
    </footer>
  );
};

export default Footer;
