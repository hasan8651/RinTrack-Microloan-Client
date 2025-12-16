import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  "/hero_image_1.png",
  "/hero_image_2.png",
  "/hero_image_3.png",
  "/hero_image_4.png",
  "/hero_image_5.png",
  "/hero_image_6.png",
];

const IMAGE_DURATION = 10;

export default function Hero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      IMAGE_DURATION * 1000
    );
    return () => clearInterval(id);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } }),
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05 },
  };

  const badges = ["100% Secure", "No Hidden Fees", "24/7 Support"];

  return (
    <section className="relative overflow-hidden text-base-content bg-orange-50 dark:bg-transparent">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="md:w-6/12 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 leading-tight text-gray-900 dark:text-white"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Get Microloans Instantly
              <br />
              with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent inline-block">
                RinTrack
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              No paperwork. No waiting.
              <br />
              Apply in 2 minutes, get approved in seconds.
              <br />
              Focus on what matters—we handle the rest.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-5 justify-center md:justify-start"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => navigate("/loans")}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-bold text-lg md:px-8 py-4 rounded-xl shadow-xl shadow-blue-500/40 transition-all"
                whileHover="hover"
                variants={buttonVariants}
              >
                <span className="relative z-10">Explore All Loans →</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start text-base text-gray-600 dark:text-gray-400">
              {badges.map((text, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-2"
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <svg
                    className="w-5 h-5 text-green-500 dark:text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:w-8/12 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full rounded-3xl overflow-hidden border-4 border-white/50 dark:border-neutral-800/50 shadow-2xl shadow-gray-400/50 dark:shadow-neutral-950/70">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[currentIndex]}
                  src={slides[currentIndex]}
                  alt="Promotional Banner"
                  className="block h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9, ease: "easeInOut" },
                    scale: { duration: IMAGE_DURATION, ease: "linear" },
                  }}
                />
              </AnimatePresence>

              <motion.div
                className="pointer-events-none absolute -inset-y-1 -left-1 h-[200%] w-[140%]"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                style={{
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                  transform: "rotate(25deg)",
                  filter: "blur(10px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
