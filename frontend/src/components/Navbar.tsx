
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Profile from "./Profile";

const Navbar = () => {
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

          {/* Navigation - visible on all screen sizes */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/tasks">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 cursor-pointer"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Profile />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 cursor-pointer"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;