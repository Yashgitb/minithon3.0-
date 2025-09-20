
import { motion } from "framer-motion";
import { Leaf, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  // Quiz restriction (7 days)
  let canTakeQuiz = false;
  if (user) {
    if (!user.lastQuizDate) {
      canTakeQuiz = true;
    } else {
      const lastQuizDate = new Date(user.lastQuizDate);
      const now = new Date();
      const diffDays = Math.floor((now - lastQuizDate) / (1000 * 60 * 60 * 24));
      canTakeQuiz = diffDays >= 7;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-green-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Leaf className="text-green-600" />
          <h1 className="font-bold text-lg sm:text-xl">EcoTrack</h1>
        </div>

        {/* Navbar buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center space-x-1 bg-green-100 px-2 sm:px-3 py-2 rounded-xl hover:bg-green-200"
              >
                <UserCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">{user.name}</span>
              </Link>

              {/* Take Quiz */}
              {canTakeQuiz ? (
                <Link
                  to="/quiz"
                  className="px-3 sm:px-4 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700"
                >
                  <span className="hidden sm:inline">Take Quiz</span>
                  <span className="sm:hidden">Quiz</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="px-3 sm:px-4 py-2 bg-gray-400 text-white text-sm rounded-xl cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Quiz Locked (7 days)</span>
                  <span className="sm:hidden">Locked</span>
                </button>
              )}

              {/* Rewards */}
              <Link
                to="/rewards"
                className="px-3 sm:px-4 py-2 bg-yellow-400 text-white text-sm rounded-xl hover:bg-yellow-500"
              >
                <span className="hidden sm:inline">Rewards</span>
                <span className="sm:hidden">🏆</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">🚪</span>
              </button>
            </>
          ) : (
            <>
              {/* New Login and Get Started Buttons with Dark Green & White styling */}
              <Link
                to="/auth"
                className="px-4 py-2 bg-white text-green-800 font-semibold border-2 border-green-800 rounded-xl hover:bg-green-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth?isRegister=true"
                className="px-4 py-2 bg-green-800 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-10 sm:px-10">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-800 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-5xl sm:text-6xl lg:text-7xl">
            Calculate Your Daily ECO-Footprint
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-700 font-semibold mb-6 sm:mb-8 max-w-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Answer a few simple questions and discover personalized eco-friendly tips to reduce your impact.
        </motion.p>

        {!user && (
          <motion.div className="flex space-x-4" whileHover={{ scale: 1.1 }}>
            <Link
              to="/auth"
              className="px-6 py-3 bg-white text-green-800 font-extrabold border-2 border-green-800 rounded-full shadow-lg hover:bg-green-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?isRegister=true"
              className="px-6 py-3 bg-green-800 text-white font-extrabold rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 text-center py-3 sm:py-4">
        <p className="text-sm sm:text-base">Built with ❤️ for the Planet 🌍</p>
      </footer>
    </div>
  );
}