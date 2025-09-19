import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions.json";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
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

    // Initialize category scores
    const categories = [...new Set(questions.map((q) => q.category))];
    const initialScores = {};
    categories.forEach((cat) => (initialScores[cat] = 0));
    setCategoryScores(initialScores);

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

  const handleSelect = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [current]: value,
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleSubmit = () => {
    let totalScore = 0;
    const finalCategoryScores = {};

    questions.forEach((q, index) => {
      const value = selectedAnswers[index] ?? 0;
      totalScore += value;
      finalCategoryScores[q.category] = (finalCategoryScores[q.category] || 0) + value;
    });

    const quizEntry = {
      date: new Date().toISOString(),
      score: totalScore,
      categoryScores: finalCategoryScores,
      creditsEarned: totalScore,
    };

    const updatedProfile = {
      ...userProfile,
      credits: (userProfile.credits || 0) + totalScore,
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
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 py-10 px-4 md:px-0">
      {/* Progress Bar */}
      <motion.div className="w-full max-w-2xl h-4 bg-green-200 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-4 bg-green-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <p className="text-gray-700 mb-6 text-lg md:text-xl">
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
              selected: selectedAnswers[current] === opt.value,
              onSelect: () => handleSelect(opt.value),
            }))}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 w-full max-w-2xl">
        <button
          onClick={handlePrevious}
          disabled={current === 0}
          className={`px-6 py-3 rounded-full shadow-md font-semibold text-white ${
            current === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-full shadow-md font-semibold text-white bg-yellow-500 hover:bg-yellow-600"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full shadow-md font-semibold text-white bg-green-600 hover:bg-green-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
