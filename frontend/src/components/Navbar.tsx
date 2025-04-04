// Navbar.jsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Profile from "./Profile";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">
                TaskMaster
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-2">
              {user ? (
                <Profile />
              ) : (
                <div>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-1 pb-3 pt-2">
            <a
              href="#"
              className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Resources
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              About
            </a>
            <div className="pt-4 flex flex-col space-y-2">
              <Button
                variant="outline"
                className="w-full justify-center border-gray-300 text-gray-700"
              >
                Log in
              </Button>
              <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
