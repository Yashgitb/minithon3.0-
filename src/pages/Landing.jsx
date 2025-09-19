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
          <h1 className="font-bold text-xl">EcoTrack</h1>
        </div>

        {/* Navbar buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center space-x-1 bg-green-100 px-3 py-2 rounded-xl hover:bg-green-200"
              >
                <UserCircle className="text-green-600" />
                <span>{user.name}</span>
              </Link>

              {/* Take Quiz */}
              {canTakeQuiz ? (
                <Link
                  to="/quiz"
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  Take Quiz
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white rounded-xl cursor-not-allowed"
                >
                  Quiz Locked (7 days)
                </button>
              )}

              {/* Rewards */}
              <Link
                to="/rewards"
                className="px-4 py-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500"
              >
                Rewards
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Login / Register
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center p-10">
        <motion.h1
          className="text-5xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Calculate Your Daily Carbon Footprint
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Answer a few simple questions and discover personalized eco-friendly tips to reduce your impact.
        </motion.p>

        {!user && (
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/auth"
              className="px-8 py-3 bg-green-600 text-white text-lg rounded-full shadow-lg"
            >
              Login / Register
            </Link>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 text-center py-4">
        Built with ❤️ for the Planet 🌍
      </footer>
    </div>
  );
}
