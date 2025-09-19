import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Rewards() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    credits: 0,
    quizzes: [],
    name: "Guest",
  });

  // Load user profile from localStorage or create default
  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("userProfile"));

    if (!storedUser) {
      storedUser = {
        name: "Guest",
        credits: 25,
        quizzes: [],
      };
      localStorage.setItem("userProfile", JSON.stringify(storedUser));
    } else {
      // Ensure structure is always complete
      storedUser = {
        name: storedUser.name || "Guest",
        credits: storedUser.credits ?? 0,
        quizzes: storedUser.quizzes ?? [],
      };
      localStorage.setItem("userProfile", JSON.stringify(storedUser));
    }

    setUserProfile(storedUser);
  }, []);

  // Rewards based on credits
  const rewards = [
    { name: "Eco Beginner", minCredits: 10, icon: "🌱" },
    { name: "Eco Advocate", minCredits: 30, icon: "🌍" },
    { name: "Eco Champion", minCredits: 50, icon: "🌟" },
  ];

  const earnedRewards = rewards.filter(
    (r) => userProfile.credits >= r.minCredits
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-8 drop-shadow-sm">
          {userProfile.name}'s Rewards
        </h1>

        {/* Credits */}
        <p className="text-center text-gray-700 text-lg md:text-xl mb-8">
          Total Credits Earned:{" "}
          <span className="font-bold text-green-900 text-2xl">
            {userProfile.credits}
          </span>
        </p>

        {/* Rewards Section */}
        {earnedRewards.length === 0 ? (
          <p className="text-center text-gray-500 mb-6 italic">
            No rewards earned yet. Take more quizzes to unlock badges!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {earnedRewards.map((reward, idx) => (
              <motion.div
                key={reward.name}
                className="bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
              >
                <span className="text-6xl mb-4">{reward.icon}</span>
                <h3 className="text-2xl font-semibold text-green-800">
                  {reward.name}
                </h3>
                <p className="text-gray-700 mt-2 text-base">
                  Earned at {reward.minCredits} credits
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/profile")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            Back to Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
