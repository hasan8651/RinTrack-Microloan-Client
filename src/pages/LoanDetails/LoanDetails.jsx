import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NotFound from "../NotFound/NotFound";
import { AuthContext } from "../../context/AuthContext";


const LoanDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loan, setloan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/loans/${id}`)
      .then(({ data }) => {
        setloan(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleApplied = () => {
    const appliedLoan = {
      loanId: loan?._id,
      title: loan?.title,
      image: loan?.image,
      interest: loan?.interest,
      maxLimit: loan?.maxLimit,
      category: loan?.category,
      email: user?.email,
    };

    console.log(appliedLoan);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/my-loan`,
        appliedLoan,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(({ data }) => {
        if (data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
            color: "white",
            title: "Course Enrolled Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to Apply Loan",
          text: error.response?.data?.message || error.message,
        });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex justify-center items-center py-20">
        <NotFound />
      </div>
    );
  }
  return (
    <div className="min-h-screen py-6 px-4">
      <Helmet>
        <title>RinTrack - {loan.title}</title>
      </Helmet>
      <div className="mb-6 text-center text-md text-base-content/70">
        Microloan Request & Tracking Platform
      </div>
      <div className="max-w-5xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={loan.image}
              alt={loan.title}
              loading="lazy"
              className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-purple-600">
              {loan.title}
            </h1>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-lg font-semibold">
              <p>
                Featured:{" "}
                <span
                  className={
                    loan.isFeatured ? "text-green-500" : "text-red-500"
                  }
                >
                  {loan.isFeatured ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Category:{" "}
                <span className="text-green-500">{loan.category}</span>
              </p>
            </div>
            <div className="border-t border-purple-600 w-100"></div>
            <p className="text-purple-600 leading-relaxed font-semibold">
              {loan.interest}
            </p>
            <div className="border-t border-purple-600 w-100"></div>
            <div className="flex gap-4 px-2 items-center justify-between text-lg font-semibold">
              <div className="md:flex md:gap-6">
                <p>
                  Limit:
                  <span className="ml-1 text-green-500">{loan.maxLimit}</span>
                </p>
                <p>
                  Price:
                  <span className="ml-1 text-green-500">${loan.interest}</span>
                </p>
              </div>
              <div>
                {user?.email && (
                  <button onClick={handleApplied} className="btn btn-gradient">
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
