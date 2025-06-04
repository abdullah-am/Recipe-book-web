import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-100 text-[#0A2A66] py-6 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Recipe Book</h3>
            <p className="text-gray-400">Discover your Hidden talent.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:underline">
                Facebook
              </a>
              <a href="https://twitter.com" className="hover:underline">
                Twitter
              </a>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-4">
          © {new Date().getFullYear()} Recipe Book. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
