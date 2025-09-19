import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from 'lucide-react';

// Simple "auth check" for demo using localStorage
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userProfile");
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading state for a smoother user experience
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loader"
          className="flex items-center justify-center min-h-screen bg-green-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Leaf className="h-12 w-12 text-green-600 mx-auto" />
            </motion.div>
            <p className="mt-4 text-green-700 font-semibold">Eco-Footprint</p>
          </div>
        </motion.div>
      ) : (
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <Rewards />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )}
    </AnimatePresence>
  );
}

export default App;