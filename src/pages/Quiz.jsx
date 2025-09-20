import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions.json";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [quizAllowed, setQuizAllowed] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selections per question

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) {
      navigate("/auth");
      return;
    }
    setUserProfile(user);

    // Weekly restriction check
    if (user.quizzes && user.quizzes.length > 0) {
      const lastQuiz = user.quizzes[user.quizzes.length - 1];
      const lastDate = new Date(lastQuiz.date);
      const now = new Date();
      const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        setQuizAllowed(false);
        const daysLeft = Math.ceil(7 - diffDays);
        setMessage(`You can take the next quiz in ${daysLeft} day(s).`);
      }
    }
  }, [navigate]);

  const handleSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [current]: option,
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleSubmit = () => {
    let totalCO2Saved = 0;
    const finalCategoryScores = {};

    questions.forEach((q, index) => {
      const selectedOption = selectedAnswers[index];
      const co2Saved = selectedOption?.co2Saved ?? 0;

      totalCO2Saved += co2Saved;
      finalCategoryScores[q.category] = (finalCategoryScores[q.category] || 0) + co2Saved;
    });

    // Conversion factor: 1 credit per 100 kg CO₂ saved
    const creditsEarned = Math.round(totalCO2Saved / 100);

    const quizEntry = {
      date: new Date().toISOString(),
      totalCO2Saved,
      score: creditsEarned,
      categoryScores: finalCategoryScores,
      creditsEarned,
    };

    const updatedProfile = {
      ...userProfile,
      credits: (userProfile.credits || 0) + creditsEarned,
      quizzes: [...(userProfile.quizzes || []), quizEntry],
    };

    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    navigate("/results");
  };

  if (!quizAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <p className="text-xl text-gray-700">{message}</p>
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 py-6 sm:py-10 px-4">
      {/* Progress Bar */}
      <motion.div className="w-full max-w-2xl h-3 sm:h-4 bg-green-200 rounded-full mb-3 sm:mb-4 overflow-hidden">
        <motion.div
          className="h-3 sm:h-4 bg-green-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg md:text-xl">
        Question {current + 1} of {questions.length}
      </p>

      {/* Animated Question Card */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuestionCard
            question={questions[current].question}
            options={questions[current].options.map((opt) => ({
              ...opt,
              selected: selectedAnswers[current]?.label === opt.label,
              onSelect: () => handleSelect(opt),
            }))}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 sm:mt-6 w-full max-w-2xl gap-2 sm:gap-4">
        <button
          onClick={handlePrevious}
          disabled={current === 0}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md font-semibold text-white text-sm sm:text-base ${
            current === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">←</span>
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md font-semibold text-white bg-yellow-500 hover:bg-yellow-600 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Submit Quiz</span>
            <span className="sm:hidden">Submit</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md font-semibold text-white bg-green-600 hover:bg-green-700 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">→</span>
          </button>
        )}
      </div>
    </div>
  );
}
