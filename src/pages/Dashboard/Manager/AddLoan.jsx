import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import Swal from "sweetalert2";

const AddLoan = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageURL = data.image; 
      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }

        // Prepare loan data
      const loanData = {
        title: data.title,
        description: data.description,
        category: data.category,
        interestRate: Number(data.interestRate),
        maxLoanLimit: Number(data.maxLoanLimit),
        image: imageURL,
        showOnHome: data.showOnHome || false,
        requiredDocuments: data.requiredDocuments,
        emiPlans: data.emiPlans,
        createdBy: 'Hasan', // i will add this from backend
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/loans`,
        loanData
      );

      if (res.data.insertedId || res.data.acknowledged) {
          Swal.fire({
          position: "top-end",
          icon: "success",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          title: "Loan Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setSelectedImage(null);
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Submit Loan",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        Create New Loan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Loan Title
            </span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="e.g. Personal Loan"
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
              {...register("category", { required: true })}
              type="text"
              placeholder="e.g. Business"
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
              {...register("interestRate", { required: true })}
              type="number"
              step="0.1"
              placeholder="e.g. 5.5"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Max Limit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Max Loan Limit
            </span>
          </label>
          <input
            {...register("maxLoanLimit", { required: true })}
            type="number"
            placeholder="e.g. 500000"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Description
            </span>
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Loan details..."
            className="textarea textarea-bordered w-full h-28 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          ></textarea>
        </div>

        {/* Required Documents */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Required Documents
            </span>
          </label>
          <input
            {...register("requiredDocuments")}
            type="text"
            placeholder="e.g. NID, Passport, Bank Statement"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* EMI Plans */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              EMI Plans
            </span>
          </label>
          <input
            {...register("emiPlans")}
            type="text"
            placeholder="e.g. 3 Months, 6 Months, 1 Year"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Loan Image
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
          </div>

        {/* Show on Home Toggle */}
        <div className="form-control flex items-center mt-4">
          <input
            {...register("showOnHome")}
            type="checkbox"
            className="checkbox checkbox-primary mr-2"
          />
          <label className="label-text font-semibold cursor-pointer">
            Show on Home Page
          </label>
        </div>

          <button
          type="submit"
          disabled={uploading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg mt-6 transition duration-300 disabled:opacity-50"
        >
          {uploading ? "Uploading, Please wait..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
