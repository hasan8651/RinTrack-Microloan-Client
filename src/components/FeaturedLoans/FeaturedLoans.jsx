import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import LoanCard from "../LoanCard/LoanCard";

const FeaturedLoans = () => {
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans-home`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl px-2 mx-auto bg-orange-50 dark:bg-transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Available Loans
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore our top microloan options tailored to your needs
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-5 sm:px-0"
        >
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              variants={cardVariants}
              className="w-full"
            >
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedLoans;
