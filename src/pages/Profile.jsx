import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) return navigate("/auth");
    setUserProfile(user);
  }, [navigate]);

  if (!userProfile) return null;

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-50 p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {userProfile.name}'s Profile
        </h2>

        {/* Total Credits & Circular Gauge */}
        <div className="flex flex-col md:flex-row justify-around items-center mb-6 gap-6">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={userProfile.credits}
              maxValue={100} // milestone
              text={`${userProfile.credits}`}
              styles={buildStyles({
                pathColor: "#16a34a",
                textColor: "#065f46",
                trailColor: "#d1fae5",
                textSize: "20px",
              })}
            />
            <p className="text-center mt-2 font-semibold text-green-700">Total Credits</p>
          </div>

          <div className="text-center md:text-left">
            <p className="text-gray-700">
              Quizzes Taken:{" "}
              <span className="font-semibold">{userProfile.quizzes.length}</span>
            </p>
            <p className="text-gray-700 mt-2">
              Rewards:{" "}
              <span className="font-semibold">
                {userProfile.credits >= 50
                  ? "🌟 Certificate Earned!"
                  : "Complete more quizzes to earn rewards"}
              </span>
            </p>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-green-50 p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Recent Quizzes</h3>
          {userProfile.quizzes.length === 0 ? (
            <p className="text-gray-700">No quizzes taken yet.</p>
          ) : (
            <ul className="list-disc pl-5 text-gray-700">
              {userProfile.quizzes
                .slice(-5)
                .reverse()
                .map((q, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">
                      {new Date(q.date).toLocaleDateString()}:
                    </span>{" "}
                    Score: {q.score}, Credits Earned: {q.creditsEarned}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
