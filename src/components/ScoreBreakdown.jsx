import { motion } from "framer-motion";

export default function ScoreBreakdown({ breakdown }) {
  // Function to get color based on CO2 saved (higher = greener)
  const getColor = (value) => {
    if (value >= 500) return "#16a34a"; // green (excellent)
    if (value >= 200) return "#eab308"; // yellow (medium)
    return "#dc2626"; // red (needs improvement)
  };

  // Maximum value for scaling bars (for visualization)
  const maxCO2 = 1000;

  return (
    <div className="w-full max-w-xl mt-4 sm:mt-6 space-y-3 sm:space-y-4">
      {breakdown.map((item, i) => (
        <motion.div
          key={i}
          className="flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
        >
          {/* Category Label */}
          <p className="text-gray-700 font-semibold mb-1 text-sm sm:text-base">{item.label}</p>

          {/* Animated Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden">
            <motion.div
              className="h-4 sm:h-5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((item.value / maxCO2) * 100, 100)}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
              style={{ backgroundColor: getColor(item.value) }}
            />
          </div>

          {/* Value Display */}
          <p className="text-xs sm:text-sm text-gray-600 mt-1">CO₂ Saved: {item.value} kg</p>
        </motion.div>
      ))}
    </div>
  );
}
