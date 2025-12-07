import axios from "axios";
import { useEffect, useState } from "react";
import LoanCard from "../LoanCard/LoanCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FeaturedLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    axios(`${import.meta.env.VITE_API_URL}/loans`)
      .then((data) => setLoans(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-14">
      <h1 className="text-2xl md:text-3xl py-4 mb-2 section-gradient font-semibold text-center">
        Popular Loans
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedLoans;
