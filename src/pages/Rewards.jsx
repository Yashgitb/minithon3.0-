
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BadgeList from "../components/BadgeList";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative">
        {/* Top buttons */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <motion.button
            onClick={() => navigate("/")}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white text-sm sm:text-md font-medium rounded-xl shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-1 sm:gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>←</span>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          {topReward && (
            <motion.button
              onClick={handleDownloadCertificate}
              className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-md font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span role="img" aria-label="certificate">📜</span>
              <span className="hidden sm:inline">Download Recent Badge</span>
              <span className="sm:hidden">Download</span>
            </motion.button>
          )}
        </div>

        {/* Page Header */}
        <motion.div
          className="text-center mt-4 sm:mt-8 mb-6 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 mb-3 sm:mb-4">
            {userProfile.name}'s Rewards
          </h1>
          <div className="inline-block bg-white rounded-2xl shadow-lg px-4 sm:px-8 py-3 sm:py-4">
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Total Credits Earned:{" "}
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 ml-1 sm:ml-2">
                {userProfile.credits}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Display all badges using the BadgeList component */}
        <BadgeList userCredits={userProfile.credits} />

        {/* New message section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center px-4">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mb-3 sm:mb-5">
            Be more eco-friendly for more badges!
          </p>
          <p className="text-base sm:text-lg text-teal-600 max-w-2xl mx-auto">
            Each quiz you complete brings you closer to new rewards and helps you learn more about protecting our planet.
          </p>
        </div>
      </div>
    </div>
  );
}