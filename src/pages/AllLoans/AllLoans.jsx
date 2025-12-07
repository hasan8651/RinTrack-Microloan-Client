import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import LoanCard from "../../components/LoanCard/LoanCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/loans`)
      .then(({ data }) => {
        setLoans(data);
        setFilteredLoans(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (category) => {
    setCategoryFilter(category);
    if (category === "") {
      setFilteredLoans(loans);
    } else {
      const filtered = loans.filter((loan) => loan.category === category);
      setFilteredLoans(filtered);
    }
  };

  const categories = [...new Set(loans.map((loan) => loan.category))];

  return (
    <div>
      <Helmet>
              <title>RinTrack - Loans</title>
            </Helmet>
      <div className="mb-4 section-gradient flex items-center justify-center py-2">
        <select
          className="select select-bordered w-full max-w-xs bg-transparent"
          value={categoryFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option className="section-gradient rounded-md" value="">
            All Category
          </option>
          {categories.map((category, i) => (
            <option className="section-gradient rounded-md my-1" key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLoans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLoans;
