// export default function Results() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">
//       <h1 className="text-3xl font-bold">Results Page (coming soon)</h1>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import ScoreBreakdown from "../components/ScoreBreakdown";

export default function Results() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const { width, height } = useWindowSize();

{score <= 10 && <Confetti width={width} height={height} recycle={false} />}
  // Fetch score from localStorage
  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem("ecoScore") || 0);
    setScore(savedScore);

    if (savedScore <= 10) {
      setCategory("Low Impact 🌱");
      setMessage("Amazing! Keep it up, you are eco-conscious already!");
    } else if (savedScore <= 25) {
      setCategory("Medium Impact 🌍");
      setMessage("Good start! Small changes can make a big difference.");
    } else {
      setCategory("High Impact 🔴");
      setMessage("Time to improve! Let’s adopt more eco-friendly habits.");
    }
  }, []);

  // Decide gauge color based on score
  const getColor = () => {
    if (score <= 10) return "#16a34a"; // green
    if (score <= 25) return "#eab308"; // yellow
    return "#dc2626"; // red
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 py-10">
      <motion.h1
        className="text-4xl font-bold text-green-800 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Your Eco Footprint
      </motion.h1>

      {/* Circular Gauge */}
      <motion.div
        className="w-64 h-64 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <CircularProgressbar
          value={score}
          maxValue={30}
          text={`${score}`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: "#065f46",
            trailColor: "#d1fae5",
            textSize: "24px",
          })}
        />
      </motion.div>

      {/* Category & Message */}
      <motion.div
        className="text-center max-w-xl mb-6 p-4 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-2">{category}</h2>
        <p className="text-gray-700">{message}</p>
      </motion.div>

      {/* Motivational Tips */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div className="p-4 bg-green-100 rounded-xl shadow-md hover:scale-105 transition-transform">
          🌱 Use a bicycle or walk whenever possible.
        </motion.div>
        <motion.div className="p-4 bg-green-100 rounded-xl shadow-md hover:scale-105 transition-transform">
          💡 Switch to energy-efficient LED lights.
        </motion.div>
        <motion.div className="p-4 bg-green-100 rounded-xl shadow-md hover:scale-105 transition-transform">
          ♻️ Recycle your plastic and paper waste regularly.
        </motion.div>
        <motion.div className="p-4 bg-green-100 rounded-xl shadow-md hover:scale-105 transition-transform">
          🥗 Reduce meat consumption and prefer plant-based meals.
        </motion.div>
      </motion.div>

      {/* Retake Button */}
      <motion.button
        onClick={() => navigate("/quiz")}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retake Quiz
      </motion.button>
      <ScoreBreakdown
  breakdown={[
    { label: "Transport", value: 40 },
    { label: "Diet", value: 20 },
    { label: "Energy", value: 25 },
    { label: "Plastic Use", value: 15 },
  ]}
/>
    </div>
  );
}