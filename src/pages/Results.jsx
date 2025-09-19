import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import ScoreBreakdown from "../components/ScoreBreakdown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import questions from "../data/questions.json";

export default function Results() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [userProfile, setUserProfile] = useState(null);
  const [latestQuiz, setLatestQuiz] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) return navigate("/auth");

    setUserProfile(user);

    if (user.quizzes && user.quizzes.length > 0) {
      setLatestQuiz(user.quizzes[user.quizzes.length - 1]);
    }
  }, [navigate]);

  if (!latestQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-xl text-gray-700">No quiz data found!</p>
      </div>
    );
  }

  const { score, categoryScores, creditsEarned } = latestQuiz;

  const getGaugeColor = () => {
    if (score <= 10) return "#16a34a"; // green
    if (score <= 25) return "#eab308"; // yellow
    return "#dc2626"; // red
  };

  const impactCategory =
    score <= 10 ? "Low Impact 🌱" : score <= 25 ? "Medium Impact 🌍" : "High Impact 🔴";

  const impactMessage =
    score <= 10
      ? "Amazing! Keep it up, you are eco-conscious already!"
      : score <= 25
      ? "Good start! Small changes can make a big difference."
      : "Time to improve! Let’s adopt more eco-friendly habits.";

  // Handle retake quiz (respecting 7-day rule)
  const handleRetake = () => {
    if (userProfile?.quizzes?.length > 0) {
      const lastQuiz = userProfile.quizzes[userProfile.quizzes.length - 1];
      const lastDate = new Date(lastQuiz.date);
      const now = new Date();
      const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);

      if (diffDays < 7) {
        const daysLeft = Math.ceil(7 - diffDays);
        alert(`You can take the next quiz in ${daysLeft} day(s).`);
        return;
      }
    }
    navigate("/quiz");
  };

  // Go back to landing page
  const handleGoHome = () => {
    navigate("/");
  };

  // Prepare breakdown array for ScoreBreakdown
  const breakdownArray = Object.entries(categoryScores).map(([label, value]) => ({
    label,
    value,
  }));

  // Prepare weekly trend (last 5 quizzes)
  const trendData = (userProfile.quizzes || [])
    .slice(-5)
    .map((q, idx) => ({
      name: `Quiz ${userProfile.quizzes.length - 5 + idx + 1}`,
      score: q.score,
    }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 py-10 px-4 md:px-0">
      {/* Confetti for low or high impact */}
      {(score <= 10 || score >= 30) && <Confetti width={width} height={height} recycle={false} />}

      {/* Title */}
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
          maxValue={questions.length * 10}
          text={`${score}`}
          styles={buildStyles({
            pathColor: getGaugeColor(),
            textColor: "#065f46",
            trailColor: "#d1fae5",
            textSize: "24px",
          })}
        />
      </motion.div>

      {/* Impact Category & Message */}
      <motion.div
        className="text-center max-w-xl mb-6 p-4 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-2">{impactCategory}</h2>
        <p className="text-gray-700">{impactMessage}</p>
        <p className="mt-2 font-medium text-green-700">Credits Earned: {creditsEarned}</p>
        <p className="mt-1 font-medium text-green-800">Total Credits: {userProfile.credits}</p>
      </motion.div>

      {/* Category Breakdown */}
      <ScoreBreakdown breakdown={breakdownArray} />

      {/* Weekly Quiz Trend */}
      {trendData.length > 0 && (
        <div className="w-full max-w-3xl mt-10 bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-green-800 text-center">Recent Quiz Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Motivational Tips */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 max-w-3xl my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {Object.entries(categoryScores).map(([category, value], idx) => (
          <motion.div
            key={category}
            className="p-4 bg-green-100 rounded-xl shadow-md hover:scale-105 transition-transform"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
          >
            <p className="font-semibold text-green-800">{category}</p>
            <p className="text-gray-700">
              {value <= 3
                ? "Excellent! Keep your habits sustainable."
                : value <= 7
                ? "Good, but can improve!"
                : "Needs attention! Consider adopting eco-friendly alternatives."}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <motion.button
          onClick={handleRetake}
          className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retake Quiz
        </motion.button>

        <motion.button
          onClick={handleGoHome}
          className="px-6 py-3 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
}
