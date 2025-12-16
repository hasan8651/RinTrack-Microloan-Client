import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AllLoanCard from "../../components/LoanCard/AllLoanCard";
import { Helmet } from "react-helmet-async";

const AllLoans = () => {
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/loans`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

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
      <Helmet>
        <title>RinTrack | All Loans</title>
      </Helmet>
      <div className="max-w-7xl px-2 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            All Available Loans
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore our all microloan options tailored to your needs
          </p>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-5 sm:px-0">
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <AllLoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllLoans;
