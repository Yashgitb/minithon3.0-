import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-green-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Leaf className="text-green-600" />
          <h1 className="font-bold text-xl">EcoTrack</h1>
        </div>
        <div>
          <Link to="/quiz" className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Start Quiz
          </Link>
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
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/quiz" className="px-8 py-3 bg-green-600 text-white text-lg rounded-full shadow-lg">
            Start Now →
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 text-center py-4">
        Built with ❤️ for the Planet 🌍
      </footer>
    </div>
  );
}