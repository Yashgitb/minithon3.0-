import { motion } from "framer-motion";

export default function ScoreBreakdown({ breakdown }) {
  return (
    <div className="w-full max-w-xl mt-6 space-y-3">
      {breakdown.map((item, i) => (
        <div key={i}>
          <p className="text-gray-700 mb-1">{item.label}</p>
          <motion.div
            className="h-4 bg-green-200 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${item.value}%` }}
            transition={{ duration: 1, delay: i * 0.2 }}
          >
            <div className="h-4 bg-green-600 rounded-full"></div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}