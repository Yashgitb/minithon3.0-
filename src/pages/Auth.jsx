import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Auth() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (isRegister && !name)) {
      setError("Please fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isRegister) {
      // Check if email already exists
      if (users.find((u) => u.email === email)) {
        setError("Email already registered");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        credits: 0,
        quizzes: [],
      };

      users.push(newUser);

      // Save updated users list
      localStorage.setItem("users", JSON.stringify(users));
      // Save logged-in profile
      localStorage.setItem("userProfile", JSON.stringify(newUser));

      // ✅ Redirect to Landing page
      navigate("/");
    } else {
      // Login
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) {
        setError("Invalid credentials");
        return;
      }

      // Save logged-in profile (fresh from users list)
      localStorage.setItem("userProfile", JSON.stringify(existingUser));

      // ✅ Redirect to Landing page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-full hover:bg-green-700"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-green-600 font-semibold"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
