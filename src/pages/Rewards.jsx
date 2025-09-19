// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function Rewards() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     credits: 0,
//     quizzes: [],
//     name: "Guest",
//   });

//   useEffect(() => {
//     let storedUser = JSON.parse(localStorage.getItem("userProfile"));
//     if (!storedUser) {
//       storedUser = { name: "Guest", credits: 25, quizzes: [] };
//       localStorage.setItem("userProfile", JSON.stringify(storedUser));
//     } else {
//       storedUser = {
//         name: storedUser.name || "Guest",
//         credits: storedUser.credits ?? 0,
//         quizzes: storedUser.quizzes ?? [],
//       };
//       localStorage.setItem("userProfile", JSON.stringify(storedUser));
//     }
//     setUserProfile(storedUser);
//   }, []);

//   const rewards = [
//     { name: "Eco Beginner", minCredits: 10, icon: "🌱", money: 5 },
//     { name: "Eco Learner", minCredits: 20, icon: "📘", money: 10 },
//     { name: "Eco Advocate", minCredits: 30, icon: "🌍", money: 15 },
//     { name: "Green Innovator", minCredits: 40, icon: "💡", money: 20 },
//     { name: "Eco Champion", minCredits: 50, icon: "🌟", money: 50 },
//     { name: "Sustainable Hero", minCredits: 70, icon: "🏆", money: 75 },
//     { name: "Carbon Saver", minCredits: 90, icon: "💚", money: 100 },
//     { name: "Planet Protector", minCredits: 120, icon: "🛡️", money: 150 },
//     { name: "Eco Legend", minCredits: 150, icon: "👑", money: 200 },
//     { name: "Global Eco Ambassador", minCredits: 200, icon: "🌐", money: 300 },
//   ];

//   const earnedRewards = rewards.filter(
//     (r) => userProfile.credits >= r.minCredits
//   );

//   const topReward = earnedRewards[earnedRewards.length - 1];

//   // Generate PDF certificate
//   const handleDownloadCertificate = async () => {
//     if (!topReward) return;

//     // Create a temporary HTML element for certificate
//     const certificateElement = document.createElement("div");
//     certificateElement.style.width = "800px";
//     certificateElement.style.height = "600px";
//     certificateElement.style.background = "linear-gradient(135deg, #e0ffe0, #a4f4a4)";
//     certificateElement.style.display = "flex";
//     certificateElement.style.flexDirection = "column";
//     certificateElement.style.justifyContent = "center";
//     certificateElement.style.alignItems = "center";
//     certificateElement.style.border = "5px solid #16a34a";
//     certificateElement.style.borderRadius = "20px";
//     certificateElement.style.padding = "40px";
//     certificateElement.style.boxSizing = "border-box";
//     certificateElement.innerHTML = `
//       <h1 style="font-size:48px; color:#065f46; margin-bottom:20px;">Eco Achievement Certificate</h1>
//       <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Awarded to</p>
//       <h2 style="font-size:36px; color:#16a34a; margin-bottom:20px;">${userProfile.name}</h2>
//       <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Badge Earned:</p>
//       <h2 style="font-size:32px; color:#16a34a; margin-bottom:20px;">${topReward.icon} ${topReward.name}</h2>
//       <p style="font-size:20px; color:#065f46; margin-bottom:5px;">Total Credits: ${userProfile.credits}</p>
//       <p style="font-size:20px; color:#065f46; margin-bottom:20px;">Monetary Reward: $${topReward.money}</p>
//       <p style="font-size:18px; color:#065f46;">Date: ${new Date().toLocaleDateString()}</p>
//     `;
//     document.body.appendChild(certificateElement);

//     // Use html2canvas to render
//     const canvas = await html2canvas(certificateElement, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [800, 600],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
//     pdf.save(`Eco_Certificate_${topReward.name}.pdf`);

//     document.body.removeChild(certificateElement);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Page Header */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4">
//             {userProfile.name}'s Rewards
//           </h1>
//           <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-4">
//             <p className="text-xl text-gray-700">
//               Total Credits Earned:{" "}
//               <span className="text-3xl font-bold text-blue-600 ml-2">
//                 {userProfile.credits}
//               </span>
//             </p>
//           </div>
//         </motion.div>

//         {/* Rewards Grid */}
//         <div className="mb-16">
//           {earnedRewards.length === 0 ? (
//             <motion.div
//               className="text-center bg-white rounded-2xl shadow-lg p-10"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <p className="text-xl text-gray-600">
//                 No rewards earned yet. Take more quizzes to unlock badges!
//               </p>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {earnedRewards.map((reward, idx) => (
//                 <motion.div
//                   key={reward.name}
//                   className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300"
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <span className="text-7xl mb-4">{reward.icon}</span>
//                   <h3 className="text-2xl font-bold text-green-800 mb-3">
//                     {reward.name}
//                   </h3>
//                   <p className="text-gray-600 mb-3">
//                     Earned at {reward.minCredits} credits
//                   </p>
//                   <div className="bg-blue-50 rounded-xl px-4 py-2">
//                     <p className="text-blue-600 font-semibold text-lg">
//                       ${reward.money} Reward
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           {topReward && (
//             <motion.button
//               onClick={handleDownloadCertificate}
//               className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span role="img" aria-label="certificate">📜</span>
//               Download Certificate
//             </motion.button>
//           )}

//           <motion.button
//             onClick={() => navigate("/")}
//             className="px-8 py-4 bg-gray-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <span>←</span>
//             Back to Home
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import BadgeList from "../components/BadgeList";     // Import the BadgeList component

// export default function Rewards() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     credits: 0,
//     quizzes: [],
//     name: "Guest",
//   });

//   useEffect(() => {
//     let storedUser = JSON.parse(localStorage.getItem("userProfile"));
//     if (!storedUser) {
//       storedUser = { name: "Guest", credits: 25, quizzes: [] };
//       localStorage.setItem("userProfile", JSON.stringify(storedUser));
//     } else {
//       storedUser = {
//         name: storedUser.name || "Guest",
//         credits: storedUser.credits ?? 0,
//         quizzes: storedUser.quizzes ?? [],
//       };
//       localStorage.setItem("userProfile", JSON.stringify(storedUser));
//     }
//     setUserProfile(storedUser);
//   }, []);

//   const rewards = [
//     { name: "Eco Beginner", minCredits: 10, icon: "🌱", money: 5 },
//     { name: "Eco Learner", minCredits: 20, icon: "📘", money: 10 },
//     { name: "Eco Advocate", minCredits: 30, icon: "🌍", money: 15 },
//     { name: "Green Innovator", minCredits: 40, icon: "💡", money: 20 },
//     { name: "Eco Champion", minCredits: 50, icon: "🌟", money: 50 },
//     { name: "Sustainable Hero", minCredits: 70, icon: "🏆", money: 75 },
//     { name: "Carbon Saver", minCredits: 90, icon: "💚", money: 100 },
//     { name: "Planet Protector", minCredits: 120, icon: "🛡️", money: 150 },
//     { name: "Eco Legend", minCredits: 150, icon: "👑", money: 200 },
//     { name: "Global Eco Ambassador", minCredits: 200, icon: "🌐", money: 300 },
//   ];

//   const earnedRewards = rewards.filter(
//     (r) => userProfile.credits >= r.minCredits
//   );

//   const topReward = earnedRewards[earnedRewards.length - 1];

//   // Generate PDF certificate
//   const handleDownloadCertificate = async () => {
//     if (!topReward) return;

//     const certificateElement = document.createElement("div");
//     certificateElement.style.width = "800px";
//     certificateElement.style.height = "600px";
//     certificateElement.style.background = "linear-gradient(135deg, #e0ffe0, #a4f4a4)";
//     certificateElement.style.display = "flex";
//     certificateElement.style.flexDirection = "column";
//     certificateElement.style.justifyContent = "center";
//     certificateElement.style.alignItems = "center";
//     certificateElement.style.border = "5px solid #16a34a";
//     certificateElement.style.borderRadius = "20px";
//     certificateElement.style.padding = "40px";
//     certificateElement.style.boxSizing = "border-box";
//     certificateElement.innerHTML = `
//       <h1 style="font-size:48px; color:#065f46; margin-bottom:20px;">Eco Achievement Certificate</h1>
//       <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Awarded to</p>
//       <h2 style="font-size:36px; color:#16a34a; margin-bottom:20px;">${userProfile.name}</h2>
//       <p style="font-size:24px; color:#065f46; margin-bottom:10px;">Badge Earned:</p>
//       <h2 style="font-size:32px; color:#16a34a; margin-bottom:20px;">${topReward.icon} ${topReward.name}</h2>
//       <p style="font-size:20px; color:#065f46; margin-bottom:5px;">Total Credits: ${userProfile.credits}</p>
//       <p style="font-size:20px; color:#065f46; margin-bottom:20px;">Monetary Reward: $${topReward.money}</p>
//       <p style="font-size:18px; color:#065f46;">Date: ${new Date().toLocaleDateString()}</p>
//     `;
//     document.body.appendChild(certificateElement);

//     const canvas = await html2canvas(certificateElement, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [800, 600],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
//     pdf.save(`Eco_Certificate_${topReward.name}.pdf`);

//     document.body.removeChild(certificateElement);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4">
//             {userProfile.name}'s Rewards
//           </h1>
//           <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-4">
//             <p className="text-xl text-gray-700">
//               Total Credits Earned:{" "}
//               <span className="text-3xl font-bold text-blue-600 ml-2">
//                 {userProfile.credits}
//               </span>
//             </p>
//           </div>
//         </motion.div>

//         {/* This is the new section */}
//         <BadgeList userCredits={userProfile.credits} />

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
//           {topReward && (
//             <motion.button
//               onClick={handleDownloadCertificate}
//               className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span role="img" aria-label="certificate">📜</span>
//               Download Certificate
//             </motion.button>
//           )}

//           <motion.button
//             onClick={() => navigate("/")}
//             className="px-8 py-4 bg-gray-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <span>←</span>
//             Back to Home
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BadgeList from "../components/BadgeList"; // Corrected import path

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4">
            {userProfile.name}'s Rewards
          </h1>
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-4">
            <p className="text-xl text-gray-700">
              Total Credits Earned:{" "}
              <span className="text-3xl font-bold text-blue-600 ml-2">
                {userProfile.credits}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Display all badges using the BadgeList component */}
        <BadgeList userCredits={userProfile.credits} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          {topReward && (
            <motion.button
              onClick={handleDownloadCertificate}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span role="img" aria-label="certificate">📜</span>
              Download Certificate
            </motion.button>
          )}

          <motion.button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gray-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>←</span>
            Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
}