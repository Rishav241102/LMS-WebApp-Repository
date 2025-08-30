import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-14 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold">Edemy</h1>
          <p className="mt-3 text-sm text-gray-200 leading-relaxed">
            Empowering learners with technology-driven education.  
            Join thousands of students mastering new skills every day 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/my-enrollments" className="hover:text-white">My Enrollments</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Resources</h2>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Blog</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Stay Updated</h2>
          <p className="text-sm text-gray-200 mb-4">
            Subscribe to get the latest courses, offers, and learning tips.
          </p>
          <form className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 flex-grow text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social + Bottom Bar */}
      <div className="mt-12 border-t border-gray-500 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-4">
          {/* Socials */}
          <div className="flex gap-5 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
          </div>

          {/* CopyRight */}
          <p className="text-gray-300 text-sm text-center md:text-right">
            ©  {new Date().getFullYear()} Edemy. All Rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
