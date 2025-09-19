import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import FloatingLeaves from "../components/FloatingLeaves";

export default function Auth() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegister && !name)) {
      setError("Please fill all fields.");
      return;
    }

    try {
      let users = JSON.parse(localStorage.getItem("users") || "[]");

      if (isRegister) {
        if (users.find((u) => u.email === email)) {
          setError("Email already registered.");
          return;
        }

        // Generate 12 dummy quizzes for a new user
        const categories = ["Transport", "Diet", "Energy", "Waste", "Water"];
        const dummyQuizzes = Array.from({ length: 12 }, (_, i) => {
          const quizDate = new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000); // every 2 days
          const details = categories.map(cat => ({
            category: cat,
            score: Math.floor(Math.random() * 10) + 1, // score 1-10
          }));
          const totalScore = details.reduce((sum, d) => sum + d.score, 0);
          const creditsEarned = Math.floor(totalScore / 5); // simple formula for credits
          return { date: quizDate, score: totalScore, creditsEarned, details };
        });

        const newUser = {
          name,
          email,
          password,
          quizzes: dummyQuizzes,
          credits: dummyQuizzes.reduce((sum, q) => sum + q.creditsEarned, 0),
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userProfile", JSON.stringify(newUser));

        navigate("/"); // redirect after registration
      } else {
        const existingUser = users.find((u) => u.email === email && u.password === password);
        if (!existingUser) {
          setError("Invalid credentials.");
          return;
        }
        localStorage.setItem("userProfile", JSON.stringify(existingUser));
        navigate("/"); // redirect after login
      }
    } catch (e) {
      console.error("Authentication error:", e);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      <FloatingLeaves />
      <motion.div
        className="relative z-10 w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-green-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error-message"
              className="text-red-600 text-sm text-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 mt-2 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRegister ? "Register" : "Login"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <motion.button
            className="text-green-600 font-semibold hover:underline"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRegister ? "Login here" : "Register now"}
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
}
