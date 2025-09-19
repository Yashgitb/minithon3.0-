import { motion } from "framer-motion";

export default function FloatingLeaves() {
  const leaves = Array(5).fill(0); // 5 leaves

  return (
    <div className="absolute inset-0 pointer-events-none">
      {leaves.map((_, i) => (
        <motion.div
          key={i}
          className="w-6 h-6 bg-green-500 rounded-full absolute"
          style={{ left: `${10 + i * 15}%`, top: "-5%" }}
          animate={{ y: ["-5%", "105%"], rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 10 + i * 2,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}