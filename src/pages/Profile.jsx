//1 

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";
// import "react-circular-progressbar/dist/styles.css";

// // Generate random pastel color
// const randomColor = () => {
//   const r = Math.floor(Math.random() * 150 + 50);
//   const g = Math.floor(Math.random() * 150 + 50);
//   const b = Math.floor(Math.random() * 150 + 50);
//   return `rgb(${r},${g},${b})`;
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest",
//     credits: 0,
//     quizzes: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     if (!user) return navigate("/auth");

//     const normalizedUser = {
//       name: user.name || "Guest",
//       credits: user.credits ?? 0,
//       quizzes: user.quizzes ?? [],
//     };
//     setUserProfile(normalizedUser);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userProfile");
//     navigate("/");
//   };

//   // --- Prepare chart data ---
//   const categoryScores = {};
//   userProfile.quizzes.forEach((q) => {
//     q.details?.forEach((d) => {
//       categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
//     });
//   });
//   const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

//   const lineData = userProfile.quizzes
//     .map((q) => ({
//       date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
//       score: q.score ?? 0,
//     }))
//     .slice(-10);

//   const last10 = userProfile.quizzes.slice(-10);
//   const categoryTrendData = last10.map((q) => {
//     const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
//     q.details?.forEach((d) => {
//       obj[d.category] = d.score ?? 0;
//     });
//     return obj;
//   });

//   // Assign colors to each category for line chart
//   const categoryColors = {};
//   Object.keys(categoryScores).forEach((cat) => {
//     categoryColors[cat] = randomColor();
//   });

//   // Function to determine bar color based on score
//   const getBarColor = (score) => {
//     if (score >= 8) return "#16a34a"; // green = high
//     if (score >= 4) return "#eab308"; // yellow = medium
//     return "#dc2626"; // red = low
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-green-50 p-4">
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-5xl mt-10"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           {userProfile.name}'s Profile
//         </h2>

//         {/* Summary Cards */}
//         <div className="flex flex-wrap justify-around gap-4 mb-8">
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Total Quizzes</p>
//             <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Total Credits</p>
//             <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Average Score</p>
//             <p className="text-2xl font-bold text-green-800">
//               {userProfile.quizzes.length
//                 ? Math.round(
//                     userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
//                   )
//                 : 0}
//             </p>
//           </div>
//         </div>

//         {/* Credits Circular Progress */}
//         <div className="w-48 mx-auto mb-8">
//           <CircularProgressbar
//             value={userProfile.credits}
//             maxValue={100}
//             text={`${userProfile.credits}`}
//             styles={buildStyles({
//               pathColor: "#16a34a",
//               textColor: "#065f46",
//               trailColor: "#d1fae5",
//               textSize: "20px",
//             })}
//           />
//           <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
//         </div>

//         {/* Category-wise Total Scores */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="score">
//                 {barData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category Trend */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {Object.keys(categoryScores).map((cat) => (
//                 <Line
//                   key={cat}
//                   type="monotone"
//                   dataKey={cat}
//                   stroke={categoryColors[cat]}
//                   strokeWidth={2}
//                 />
//               ))}
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Recent Quiz Performance */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Back / Logout Buttons */}
//         <div className="flex justify-center gap-4 mt-4">
//           <button
//             onClick={() => navigate("/rewards")}
//             className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md"
//           >
//             View Rewards
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md"
//           >
//             Logout
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


//2

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";
// import "react-circular-progressbar/dist/styles.css";

// // Generate random pastel color
// const randomColor = () => {
//   const r = Math.floor(Math.random() * 150 + 50);
//   const g = Math.floor(Math.random() * 150 + 50);
//   const b = Math.floor(Math.random() * 150 + 50);
//   return `rgb(${r},${g},${b})`;
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest",
//     credits: 0,
//     quizzes: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     if (!user) return navigate("/auth");

//     const normalizedUser = {
//       name: user.name || "Guest",
//       credits: user.credits ?? 0,
//       quizzes: user.quizzes ?? [],
//     };
//     setUserProfile(normalizedUser);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userProfile");
//     navigate("/");
//   };

//   // --- Prepare chart data ---
//   const categoryScores = {};
//   userProfile.quizzes.forEach((q) => {
//     q.details?.forEach((d) => {
//       categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
//     });
//   });
//   const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

//   const lineData = userProfile.quizzes
//     .map((q) => ({
//       date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
//       score: q.score ?? 0,
//     }))
//     .slice(-10);

//   const last10 = userProfile.quizzes.slice(-10);
//   const categoryTrendData = last10.map((q) => {
//     const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
//     q.details?.forEach((d) => {
//       obj[d.category] = d.score ?? 0;
//     });
//     return obj;
//   });

//   // Assign colors to each category for line chart
//   const categoryColors = {};
//   Object.keys(categoryScores).forEach((cat) => {
//     categoryColors[cat] = randomColor();
//   });

//   // Function to determine bar color based on score
//   const getBarColor = (score) => {
//     if (score >= 8) return "#16a34a"; // green = high
//     if (score >= 4) return "#eab308"; // yellow = medium
//     return "#dc2626"; // red = low
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col p-4">
//       {/* Top Buttons Section */}
//       <div className="flex justify-between items-center w-full px-4 pt-4">
//         {/* View Rewards Button */}
//         <button
//           onClick={() => navigate("/rewards")}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           View Rewards
//         </button>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Container */}
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-5xl mt-8 mx-auto flex-grow overflow-y-auto"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           {userProfile.name}'s Profile
//         </h2>

//         {/* Summary Cards */}
//         <div className="flex flex-wrap justify-around gap-4 mb-8">
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Total Quizzes</p>
//             <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Total Credits</p>
//             <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//             <p className="text-gray-700">Average Score</p>
//             <p className="text-2xl font-bold text-green-800">
//               {userProfile.quizzes.length
//                 ? Math.round(
//                     userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
//                   )
//                 : 0}
//             </p>
//           </div>
//         </div>

//         {/* Credits Circular Progress */}
//         <div className="w-48 mx-auto mb-8">
//           <CircularProgressbar
//             value={userProfile.credits}
//             maxValue={100}
//             text={`${userProfile.credits}`}
//             styles={buildStyles({
//               pathColor: "#16a34a",
//               textColor: "#065f46",
//               trailColor: "#d1fae5",
//               textSize: "20px",
//             })}
//           />
//           <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
//         </div>

//         {/* Category-wise Total Scores */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="score">
//                 {barData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category Trend */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {Object.keys(categoryScores).map((cat) => (
//                 <Line
//                   key={cat}
//                   type="monotone"
//                   dataKey={cat}
//                   stroke={categoryColors[cat]}
//                   strokeWidth={2}
//                 />
//               ))}
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Recent Quiz Performance */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
//3

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";
// import "react-circular-progressbar/dist/styles.css";

// // Generate random pastel color
// const randomColor = () => {
//   const r = Math.floor(Math.random() * 150 + 50);
//   const g = Math.floor(Math.random() * 150 + 50);
//   const b = Math.floor(Math.random() * 150 + 50);
//   return `rgb(${r},${g},${b})`;
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest",
//     credits: 0,
//     quizzes: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     if (!user) return navigate("/auth");

//     const normalizedUser = {
//       name: user.name || "Guest",
//       credits: user.credits ?? 0,
//       quizzes: user.quizzes ?? [],
//     };
//     setUserProfile(normalizedUser);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userProfile");
//     navigate("/");
//   };

//   // --- Prepare chart data ---
//   const categoryScores = {};
//   userProfile.quizzes.forEach((q) => {
//     q.details?.forEach((d) => {
//       categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
//     });
//   });
//   const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

//   const lineData = userProfile.quizzes
//     .map((q) => ({
//       date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
//       score: q.score ?? 0,
//     }))
//     .slice(-10);

//   const last10 = userProfile.quizzes.slice(-10);
//   const categoryTrendData = last10.map((q) => {
//     const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
//     q.details?.forEach((d) => {
//       obj[d.category] = d.score ?? 0;
//     });
//     return obj;
//   });

//   // Assign colors to each category for line chart
//   const categoryColors = {};
//   Object.keys(categoryScores).forEach((cat) => {
//     categoryColors[cat] = randomColor();
//   });

//   // Function to determine bar color based on score
//   const getBarColor = (score) => {
//     if (score >= 8) return "#16a34a"; // green = high
//     if (score >= 4) return "#eab308"; // yellow = medium
//     return "#dc2626"; // red = low
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col p-4">
//       {/* Top Buttons Section */}
//       <div className="flex justify-between items-center w-full px-4 pt-4">
//         {/* View Rewards Button */}
//         <button
//           onClick={() => navigate("/rewards")}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           View Rewards
//         </button>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Container */}
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl mx-auto mt-8 flex-grow"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           {userProfile.name}'s Profile
//         </h2>

//         <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
//           {/* Left Column (Summary & Progress) */}
//           <div className="flex flex-col items-center w-full lg:w-1/2">
//             {/* Summary Cards */}
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Quizzes</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Credits</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Average Score</p>
//                 <p className="text-2xl font-bold text-green-800">
//                   {userProfile.quizzes.length
//                     ? Math.round(
//                         userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
//                       )
//                     : 0}
//                 </p>
//               </div>
//             </div>

//             {/* Credits Circular Progress */}
//             <div className="w-48 mb-8">
//               <CircularProgressbar
//                 value={userProfile.credits}
//                 maxValue={100}
//                 text={`${userProfile.credits}`}
//                 styles={buildStyles({
//                   pathColor: "#16a34a",
//                   textColor: "#065f46",
//                   trailColor: "#d1fae5",
//                   textSize: "20px",
//                 })}
//               />
//               <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
//             </div>

//             {/* Category-wise Total Scores Bar Chart */}
//             <div className="w-full">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="score">
//                     {barData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Right Column (Trends & Performance) */}
//           <div className="flex flex-col w-full lg:w-1/2">
//             {/* Category Trend */}
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   {Object.keys(categoryScores).map((cat) => (
//                     <Line
//                       key={cat}
//                       type="monotone"
//                       dataKey={cat}
//                       stroke={categoryColors[cat]}
//                       strokeWidth={2}
//                     />
//                   ))}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Recent Quiz Performance */}
//             <div>
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// // }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";
// import "react-circular-progressbar/dist/styles.css";

// // Generate random pastel color
// const randomColor = () => {
//   const r = Math.floor(Math.random() * 150 + 50);
//   const g = Math.floor(Math.random() * 150 + 50);
//   const b = Math.floor(Math.random() * 150 + 50);
//   return `rgb(${r},${g},${b})`;
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest",
//     credits: 0,
//     quizzes: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     if (!user) return navigate("/auth");

//     const normalizedUser = {
//       name: user.name || "Guest",
//       credits: user.credits ?? 0,
//       quizzes: user.quizzes ?? [],
//     };
//     setUserProfile(normalizedUser);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userProfile");
//     navigate("/");
//   };

//   // --- Prepare chart data ---
//   const categoryScores = {};
//   userProfile.quizzes.forEach((q) => {
//     q.details?.forEach((d) => {
//       categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
//     });
//   });
//   const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

//   const lineData = userProfile.quizzes
//     .map((q) => ({
//       date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
//       score: q.score ?? 0,
//     }))
//     .slice(-10);

//   const last10 = userProfile.quizzes.slice(-10);
//   const categoryTrendData = last10.map((q) => {
//     const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
//     q.details?.forEach((d) => {
//       obj[d.category] = d.score ?? 0;
//     });
//     return obj;
//   });

//   // Assign colors to each category for line chart
//   const categoryColors = {};
//   Object.keys(categoryScores).forEach((cat) => {
//     categoryColors[cat] = randomColor();
//   });

//   // Function to determine bar color based on score
//   const getBarColor = (score) => {
//     if (score >= 8) return "#16a34a"; // green = high
//     if (score >= 4) return "#eab308"; // yellow = medium
//     return "#dc2626"; // red = low
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col p-4">
//       {/* Top Buttons Section */}
//       <div className="flex justify-between items-center w-full px-4 pt-4">
//         {/* View Rewards Button */}
//         <button
//           onClick={() => navigate("/rewards")}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           View Rewards
//         </button>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Container */}
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-lg w-full mt-8 mx-auto flex-grow"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           {userProfile.name}'s Profile
//         </h2>

//         <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
//           {/* Left Column (Summary & Progress) */}
//           <div className="flex flex-col items-center w-full lg:w-1/2">
//             {/* Summary Cards */}
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Quizzes</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Credits</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Average Score</p>
//                 <p className="text-2xl font-bold text-green-800">
//                   {userProfile.quizzes.length
//                     ? Math.round(
//                         userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
//                       )
//                     : 0}
//                 </p>
//               </div>
//             </div>

//             {/* Credits Circular Progress */}
//             <div className="w-48 mb-8">
//               <CircularProgressbar
//                 value={userProfile.credits}
//                 maxValue={100}
//                 text={`${userProfile.credits}`}
//                 styles={buildStyles({
//                   pathColor: "#16a34a",
//                   textColor: "#065f46",
//                   trailColor: "#d1fae5",
//                   textSize: "20px",
//                 })}
//               />
//               <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
//             </div>

//             {/* Category-wise Total Scores Bar Chart */}
//             <div className="w-full">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="score">
//                     {barData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Right Column (Trends & Performance) */}
//           <div className="flex flex-col w-full lg:w-1/2">
//             {/* Category Trend */}
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   {Object.keys(categoryScores).map((cat) => (
//                     <Line
//                       key={cat}
//                       type="monotone"
//                       dataKey={cat}
//                       stroke={categoryColors[cat]}
//                       strokeWidth={2}
//                     />
//                   ))}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Recent Quiz Performance */}
//             <div>
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";
// import "react-circular-progressbar/dist/styles.css";

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest",
//     credits: 0,
//     quizzes: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     if (!user) return navigate("/auth");

//     const normalizedUser = {
//       name: user.name || "Guest",
//       credits: user.credits ?? 0,
//       quizzes: user.quizzes ?? [],
//     };
//     setUserProfile(normalizedUser);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userProfile");
//     navigate("/");
//   };

//   // --- Prepare chart data ---
//   const categoryScores = {};
//   userProfile.quizzes.forEach((q) => {
//     q.details?.forEach((d) => {
//       categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
//     });
//   });
//   const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

//   const lineData = userProfile.quizzes
//     .map((q) => ({
//       date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
//       score: q.score ?? 0,
//     }))
//     .slice(-10);

//   const last10 = userProfile.quizzes.slice(-10);
//   const categoryTrendData = last10.map((q) => {
//     const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
//     q.details?.forEach((d) => {
//       obj[d.category] = d.score ?? 0;
//     });
//     return obj;
//   });

//   // Assign specific colors to each category for line chart
//   const categoryColors = {
//     Transport: "#22c55e",
//     Diet: "#eab308",
//     Energy: "#ef4444",
//     Waste: "#8b5cf6",
//     Water: "#3b82f6",
//   };

//   // Function to determine bar color based on score
//   const getBarColor = (score) => {
//     if (score >= 8) return "#16a34a"; // green = high
//     if (score >= 4) return "#eab308"; // yellow = medium
//     return "#dc2626"; // red = low
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col p-4">
//       {/* Top Buttons Section */}
//       <div className="flex justify-between items-center w-full px-4 pt-4">
//         {/* View Rewards Button */}
//         <button
//           onClick={() => navigate("/rewards")}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           View Rewards
//         </button>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Container */}
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-lg w-full mt-8 mx-auto flex-grow"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           {userProfile.name}'s Profile
//         </h2>

//         <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
//           {/* Left Column (Summary & Progress) */}
//           <div className="flex flex-col items-center w-full lg:w-1/2">
//             {/* Summary Cards */}
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Quizzes</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Total Credits</p>
//                 <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
//                 <p className="text-gray-700">Average Score</p>
//                 <p className="text-2xl font-bold text-green-800">
//                   {userProfile.quizzes.length
//                     ? Math.round(
//                         userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
//                       )
//                     : 0}
//                 </p>
//               </div>
//             </div>

//             {/* Credits Circular Progress */}
//             <div className="w-48 mb-8">
//               <CircularProgressbar
//                 value={userProfile.credits}
//                 maxValue={100}
//                 text={`${userProfile.credits}`}
//                 styles={buildStyles({
//                   pathColor: "#16a34a",
//                   textColor: "#065f46",
//                   trailColor: "#d1fae5",
//                   textSize: "20px",
//                 })}
//               />
//               <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
//             </div>

//             {/* Category-wise Total Scores Bar Chart */}
//             <div className="w-full">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="score">
//                     {barData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Right Column (Trends & Performance) */}
//           <div className="flex flex-col w-full lg:w-1/2">
//             {/* Category Trend */}
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   {Object.keys(categoryColors).map((cat) => (
//                     <Line
//                       key={cat}
//                       type="monotone"
//                       dataKey={cat}
//                       stroke={categoryColors[cat]}
//                       strokeWidth={2}
//                     />
//                   ))}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Recent Quiz Performance */}
//             <div>
//               <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: "Guest",
    credits: 0,
    quizzes: [],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) return navigate("/auth");

    const normalizedUser = {
      name: user.name || "Guest",
      credits: user.credits ?? 0,
      quizzes: user.quizzes ?? [],
    };
    setUserProfile(normalizedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  // --- Prepare chart data ---
  const categoryScores = {};
  userProfile.quizzes.forEach((q) => {
    q.details?.forEach((d) => {
      categoryScores[d.category] = (categoryScores[d.category] || 0) + d.score;
    });
  });
  const barData = Object.entries(categoryScores).map(([category, score]) => ({ category, score }));

  const lineData = userProfile.quizzes
    .map((q) => ({
      date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown",
      score: q.score ?? 0,
    }))
    .slice(-10);

  const last10 = userProfile.quizzes.slice(-10);
  const categoryTrendData = last10.map((q) => {
    const obj = { date: q.date ? new Date(q.date).toLocaleDateString() : "Unknown" };
    q.details?.forEach((d) => {
      obj[d.category] = d.score ?? 0;
    });
    return obj;
  });

  // Assign specific colors to each category for line chart
  const categoryColors = {
    Transport: "#22c55e",
    Diet: "#eab308",
    Energy: "#ef4444",
    Waste: "#8b5cf6",
    Water: "#3b82f6",
  };

  // Function to determine bar color based on score
  const getBarColor = (score) => {
    if (score >= 8) return "#16a34a"; // green = high
    if (score >= 4) return "#eab308"; // yellow = medium
    return "#dc2626"; // red = low
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 flex flex-col items-center justify-center">
      {/* Main Content Container (White Card) */}
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full h-full flex-grow mx-auto flex flex-col" // Added h-full and flex-grow
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section with Buttons and Profile Name */}
        <div className="flex justify-between items-center w-full mb-6">
          {/* View Rewards Button */}
          <button
            onClick={() => navigate("/rewards")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
          >
            View Rewards
          </button>

          <h2 className="text-3xl font-bold text-green-800 text-center flex-grow">
            {userProfile.name}'s Profile
          </h2>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Remaining Content: Summary, Progress, and Charts */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start flex-grow overflow-auto"> {/* flex-grow and overflow-auto added */}
          {/* Left Column (Summary & Progress) */}
          <div className="flex flex-col items-center w-full lg:w-1/2">
            {/* Summary Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
                <p className="text-gray-700">Total Quizzes</p>
                <p className="text-2xl font-bold text-green-800">{userProfile.quizzes.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
                <p className="text-gray-700">Total Credits</p>
                <p className="text-2xl font-bold text-green-800">{userProfile.credits}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl shadow-md w-48 text-center">
                <p className="text-gray-700">Average Score</p>
                <p className="text-2xl font-bold text-green-800">
                  {userProfile.quizzes.length
                    ? Math.round(
                        userProfile.quizzes.reduce((sum, q) => sum + (q.score ?? 0), 0) / userProfile.quizzes.length
                      )
                    : 0}
                </p>
              </div>
            </div>

            {/* Credits Circular Progress */}
            <div className="w-48 mb-8">
              <CircularProgressbar
                value={userProfile.credits}
                maxValue={100}
                text={`${userProfile.credits}`}
                styles={buildStyles({
                  pathColor: "#16a34a",
                  textColor: "#065f46",
                  trailColor: "#d1fae5",
                  textSize: "20px",
                })}
              />
              <p className="text-center mt-2 font-semibold text-green-700">Credits Progress</p>
            </div>

            {/* Category-wise Total Scores Bar Chart */}
            <div className="w-full">
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category-wise Total Scores</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score">
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column (Trends & Performance) */}
          <div className="flex flex-col w-full lg:w-1/2">
            {/* Category Trend */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Category Trend (Last 10 Quizzes)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={categoryTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(categoryColors).map((cat) => (
                    <Line
                      key={cat}
                      type="monotone"
                      dataKey={cat}
                      stroke={categoryColors[cat]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Quiz Performance */}
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Recent Quiz Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
