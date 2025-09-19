import { motion } from "framer-motion";

export default function QuestionCard({ question, options, onSelect }) {
  return (
    <motion.div
      className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-green-700 mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(opt.value)}
            className="w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl"
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}