import { motion } from "framer-motion";
import { useState } from "react";

export default function QuestionCard({ question, options, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (opt) => {
    setSelected(opt.label);
    if (opt.onSelect) opt.onSelect();
  };

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-lg"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`w-full px-5 py-3 rounded-2xl text-green-900 font-medium shadow-md
              ${selected === opt.label ? "bg-green-400 text-white shadow-lg" : "bg-green-100 hover:bg-green-200"}`}
          >
            {selected === opt.label && (
              <span className="mr-2">✔️</span>
            )}
            {opt.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
