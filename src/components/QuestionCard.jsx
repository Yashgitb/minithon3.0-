import { motion } from "framer-motion";
import { useState } from "react";
import { FaLeaf, FaRecycle, FaFire } from "react-icons/fa";

export default function QuestionCard({ question, options, onSelect }) {
  const [selected, setSelected] = useState(null);

  // Get icon based on option value
  const getIcon = (value) => {
    if (value >= 8) return <FaLeaf className="text-green-600 text-xl mr-2" />;
    if (value >= 4) return <FaRecycle className="text-yellow-500 text-xl mr-2" />;
    return <FaFire className="text-red-600 text-xl mr-2" />;
  };

  const handleClick = (opt) => {
    setSelected(opt.label);
    if (opt.onSelect) opt.onSelect();
  };

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-lg relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Question */}
      <h2 className="text-2xl font-bold text-green-800 mb-6">{question}</h2>

      {/* Options */}
      <div className="space-y-4">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(opt)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`w-full px-5 py-4 rounded-2xl flex items-center justify-between font-medium shadow-md transition-colors duration-300
              ${
                selected === opt.label
                  ? "bg-green-400 text-white shadow-lg border-2 border-green-600"
                  : "bg-green-100 text-green-900 hover:bg-green-200"
              }`}
          >
            <div className="flex items-center">
              {getIcon(opt.value)}
              <span>{opt.label}</span>
            </div>
            <span
              className={`font-semibold ${
                opt.value >= 8
                  ? "text-green-700"
                  : opt.value >= 4
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              +{opt.value} pts
            </span>
          </motion.button>
        ))}
      </div>

      {/* Optional animated background sparkles */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {/* You can add SVG sparkles or soft gradients here */}
      </motion.div>
    </motion.div>
  );
}
