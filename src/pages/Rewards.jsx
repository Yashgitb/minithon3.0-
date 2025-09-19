import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Rewards() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) return navigate("/auth");
    setUserProfile(user);
  }, [navigate]);

  if (!userProfile) return null;

  // Example reward milestones
  const rewardMilestones = [
    { credits: 10, reward: "🌱 Eco Starter Badge" },
    { credits: 25, reward: "🌍 Green Contributor Badge" },
    { credits: 50, reward: "🌟 Certificate of Eco Excellence" },
    { credits: 100, reward: "🏆 Eco Master Trophy" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-50 p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {userProfile.name}'s Rewards
        </h2>

        <p className="text-gray-700 mb-6 text-center">
          Total Credits: <span className="font-semibold">{userProfile.credits}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardMilestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              className={`p-4 rounded-xl shadow-md text-center ${
                userProfile.credits >= milestone.credits
                  ? "bg-green-100 border-2 border-green-600"
                  : "bg-gray-100 border border-gray-300"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <p className="font-semibold text-green-800">{milestone.reward}</p>
              <p className="text-gray-700 mt-1">
                Requires {milestone.credits} Credits
              </p>
              {userProfile.credits >= milestone.credits && (
                <p className="mt-2 text-yellow-500 font-bold">Unlocked ✅</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
          >
            Back to Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
