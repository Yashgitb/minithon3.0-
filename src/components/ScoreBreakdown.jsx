import { motion } from "framer-motion";

export default function ScoreBreakdown({ breakdown }) {
  // Function to get color based on value
  const getColor = (value) => {
    if (value <= 3) return "#16a34a"; // green
    if (value <= 7) return "#eab308"; // yellow
    return "#dc2626"; // red
  };

  return (
    <div className="w-full max-w-xl mt-6 space-y-4">
      {breakdown.map((item, i) => (
        <motion.div
          key={i}
          className="flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.3 }}
        >
          {/* Category Label */}
          <p className="text-gray-700 font-semibold mb-1">{item.label}</p>

          {/* Animated Bar */}
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <motion.div
              className="h-5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${item.value * 10}%` }} // scale for better visualization
              transition={{ duration: 1, delay: i * 0.3 }}
              style={{ backgroundColor: getColor(item.value) }}
            />
          </div>

          {/* Value Display */}
          <p className="text-sm text-gray-600 mt-1">
            Score: {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
