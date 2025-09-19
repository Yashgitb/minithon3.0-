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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));

    if (!storedUser) {
      navigate("/auth"); // if no user, go to login/register
      return;
    }

    setUserProfile(storedUser);

    // Initialize category scores
    const categories = [...new Set(questions.map((q) => q.category))];
    const initialScores = {};
    categories.forEach((cat) => (initialScores[cat] = 0));
    setCategoryScores(initialScores);

    // Weekly restriction check
    if (storedUser.quizzes && storedUser.quizzes.length > 0) {
      const lastQuiz = storedUser.quizzes[storedUser.quizzes.length - 1];
      const lastDate = new Date(lastQuiz.date);
      const now = new Date();
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays < 7) {
        setQuizAllowed(false);
        const daysLeft = 7 - diffDays;
        setMessage(`You can take the next quiz in ${daysLeft} day(s).`);
      }
    }
  }, [navigate]);

  const handleSelect = (value, category) => {
    const newScore = score + value;
    const newCategoryScores = {
      ...categoryScores,
      [category]: (categoryScores[category] || 0) + value,
    };

    setScore(newScore);
    setCategoryScores(newCategoryScores);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      // Save quiz entry
      const quizEntry = {
        date: new Date().toISOString(),
        score: newScore,
        categoryScores: newCategoryScores,
        creditsEarned: newScore,
      };

      const storedUser = JSON.parse(localStorage.getItem("userProfile")) || {};
      const updatedProfile = {
        ...storedUser,
        credits: (storedUser.credits || 0) + newScore,
        quizzes: [...(storedUser.quizzes || []), quizEntry],
      };

      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);

      navigate("/results");
    }
  };

  // If quiz not allowed due to weekly restriction
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

      {/* Progress Text */}
      <p className="text-gray-700 mb-6 text-lg md:text-xl">
        Question {current + 1} of {questions.length}
      </p>

      {/* Animated Question Card */}
      <AnimatePresence mode="wait">
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
              onSelect: () =>
                handleSelect(opt.value, questions[current].category),
            }))}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
