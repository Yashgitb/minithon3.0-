import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Rewards() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    credits: 0,
    quizzes: [],
    name: "Guest",
  });

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (!storedUser) {
      storedUser = { name: "Guest", credits: 25, quizzes: [] };
      localStorage.setItem("userProfile", JSON.stringify(storedUser));
    } else {
      storedUser = {
        name: storedUser.name || "Guest",
        credits: storedUser.credits ?? 0,
        quizzes: storedUser.quizzes ?? [],
      };
      localStorage.setItem("userProfile", JSON.stringify(storedUser));
    }
    setUserProfile(storedUser);
  }, []);

  const rewards = [
    { name: "Eco Beginner", minCredits: 10, icon: "🌱", money: 5 },
    { name: "Eco Learner", minCredits: 20, icon: "📘", money: 10 },
    { name: "Eco Advocate", minCredits: 30, icon: "🌍", money: 15 },
    { name: "Green Innovator", minCredits: 40, icon: "💡", money: 20 },
    { name: "Eco Champion", minCredits: 50, icon: "🌟", money: 50 },
    { name: "Sustainable Hero", minCredits: 70, icon: "🏆", money: 75 },
    { name: "Carbon Saver", minCredits: 90, icon: "💚", money: 100 },
    { name: "Planet Protector", minCredits: 120, icon: "🛡️", money: 150 },
    { name: "Eco Legend", minCredits: 150, icon: "👑", money: 200 },
    { name: "Global Eco Ambassador", minCredits: 200, icon: "🌐", money: 300 },
  ];

  const earnedRewards = rewards.filter(
    (r) => userProfile.credits >= r.minCredits
  );

  const topReward = earnedRewards[earnedRewards.length - 1];

  // Generate PDF certificate
  const handleDownloadCertificate = async () => {
    if (!topReward) return;

    // Create a temporary HTML element for certificate
    const certificateElement = document.createElement("div");
    certificateElement.style.width = "800px";
    certificateElement.style.height = "600px";
    certificateElement.style.background = "linear-gradient(135deg, #e0ffe0, #a4f4a4)";
    certificateElement.style.display = "flex";
    certificateElement.style.flexDirection = "column";
    certificateElement.style.justifyContent = "center";
    certificateElement.style.alignItems = "center";
    certificateElement.style.border = "5px solid #16a34a";
    certificateElement.style.borderRadius = "20px";
    certificateElement.style.padding = "40px";
    certificateElement.style.boxSizing = "border-box";
    certificateElement.innerHTML = `
      <h1 style="font-size:48px; color:#065f46; margin-bottom:20px;">Eco Achievement Certificate</h1>
      <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Awarded to</p>
      <h2 style="font-size:36px; color:#16a34a; margin-bottom:20px;">${userProfile.name}</h2>
      <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Badge Earned:</p>
      <h2 style="font-size:32px; color:#16a34a; margin-bottom:20px;">${topReward.icon} ${topReward.name}</h2>
      <p style="font-size:20px; color:#065f46; margin-bottom:5px;">Total Credits: ${userProfile.credits}</p>
      <p style="font-size:20px; color:#065f46; margin-bottom:20px;">Monetary Reward: $${topReward.money}</p>
      <p style="font-size:18px; color:#065f46;">Date: ${new Date().toLocaleDateString()}</p>
    `;
    document.body.appendChild(certificateElement);

    // Use html2canvas to render
    const canvas = await html2canvas(certificateElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });
    pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
    pdf.save(`Eco_Certificate_${topReward.name}.pdf`);

    document.body.removeChild(certificateElement);
  };

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
                <p className="text-green-900 font-semibold mt-1">
                  ${reward.money} Reward
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Button */}
        {topReward && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleDownloadCertificate}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              Download Certificate for {topReward.name}
            </button>
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
