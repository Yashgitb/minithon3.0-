// export default function Quiz() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">
//       <h1 className="text-3xl font-bold">Quiz Page (coming soon)</h1>
//     </div>
//   );
// }



// import QuestionCard from "../components/QuestionCard";

// export default function Quiz() {
//   const sampleQ = {
//     question: "How do you usually commute?",
//     options: [
//       { label: "Car", value: 10 },
//       { label: "Bus/Train", value: 5 },
//       { label: "Bicycle/Walk", value: 1 },
//     ],
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">
//       <QuestionCard
//         question={sampleQ.question}
//         options={sampleQ.options}
//         onSelect={(v) => console.log("selected", v)}
//       />
//     </div>
//   );
// }



//3rd 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions.json";
import { motion } from "framer-motion";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setScore(score + value);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Save score in localStorage to use in Results page
      localStorage.setItem("ecoScore", score + value);
      navigate("/results");
    }
  };

  // Calculate progress percentage
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 py-10">
      {/* Progress Bar */}
      <motion.div
        className="w-11/12 h-4 bg-green-200 rounded-full mb-6"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-4 bg-green-600 rounded-full"></div>
      </motion.div>

      {/* Question Card */}
      <QuestionCard
        question={questions[current].question}
        options={questions[current].options}
        onSelect={handleSelect}
      />
    </div>
  );
}

