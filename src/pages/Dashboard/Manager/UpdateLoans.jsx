import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const UpdateLoans = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/loans/${id}`
        );
        setLoan(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
          Swal.fire({
                icon: "error",
                title: "Failed to load loan data",
                text: err.response?.data?.message || err.message,
              });
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = loan.image;

      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }

      const updatedData = {
        title: e.target.title.value,
        category: e.target.category.value,
        description: e.target.description.value,
        interestRate: parseFloat(e.target.interestRate.value),
        maxLoanLimit: parseFloat(e.target.maxLoanLimit.value),
        emiPlans: e.target.emiPlans.value,
        requiredDocuments: e.target.requiredDocuments.value,
        image: imageURL,
        showOnHome: e.target.showOnHome.checked,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/loans/${id}`,
        updatedData
      );
        Swal.fire({
                position: "top-end",
                icon: "success",
                background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
                color: "white",
                title: "Loan updated successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
      navigate("/dashboard/manage-loans");
    } catch (err) {
      console.error(err);
           Swal.fire({
              icon: "error",
              title: "Failed to update loan",
              text: err.response?.data?.message || err.message,
            });
    }
  };

  if (loading) return <LoadingSpinner/>;
  if (!loan) return <p className="text-center mt-12">Loan not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Loan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
           <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Title</span>
          </label>
          <input
            name="title"
            defaultValue={loan.title}
            placeholder="Loan title"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Category
              </span>
            </label>
            <input
              name="category"
              defaultValue={loan.category}
              placeholder="Category"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Interest Rate (%)
              </span>
            </label>
            <input
              name="interestRate"
              type="number"
              step="0.1"
              defaultValue={loan.interestRate}
              placeholder="Interest Rate"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Max Loan Limit
            </span>
          </label>
          <input
            name="maxLoanLimit"
            type="number"
            defaultValue={loan.maxLoanLimit}
            placeholder="Max Loan Limit"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Description
            </span>
          </label>
          <textarea
            name="description"
            defaultValue={loan.description}
            placeholder="Description"
            className="textarea textarea-bordered w-full h-28 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              EMI Plans
            </span>
          </label>
          <input
            name="emiPlans"
            defaultValue={loan.emiPlans}
            placeholder="3 Months, 6 Months"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Required Documents
            </span>
          </label>
          <input
            name="requiredDocuments"
            defaultValue={loan.requiredDocuments}
            placeholder="NID, Passport"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
            {loan.image && (
            <img
              src={loan.image}
              alt="Loan Image"
              className="mt-2 w-32 h-20 object-cover rounded-md border"
            />
          )}
        </div>

          <div className="form-control flex items-center mt-4">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={loan.showOnHome}
            className="checkbox checkbox-primary mr-2"
          />
          <label className="label-text font-semibold cursor-pointer">
            Show on Home
          </label>
        </div>

      <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg mt-6 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateLoans;
