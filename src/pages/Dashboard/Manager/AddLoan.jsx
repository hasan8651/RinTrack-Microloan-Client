import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload, showAlert } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddLoan = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageURL = data.image;

      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }

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
        createdBy: user?.email || "unknown",
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/loans", loanData);

      if (res.data.insertedId || res.data.acknowledged) {
        showAlert({
          icon: "success",
          color: "lime",
          title: "Loan added successfully!",
        });
        reset();
        setSelectedImage(null);
      }
    } catch (err) {
      console.error("Error:", err);
      showAlert({
        icon: "error",
        color: "pink",
        title: "Failed to submit loan",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | AddLoan</title>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <div className="bg-orange-100 dark:bg-neutral-900/90 border border-blue-400/20 rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
            Create New Loan
          </h2>
          <p className="text-sm text-center mb-6 text-gray-500 dark:text-gray-400">
            Define a new loan product for borrowers to apply for.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Loan Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="e.g. Personal Loan"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Loan details..."
                className="w-full h-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Category
                </label>
                <input
                  {...register("category", { required: true })}
                  type="text"
                  placeholder="e.g. Business"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                             bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  {...register("interestRate", { required: true })}
                  type="number"
                  step="0.05"
                  placeholder="e.g. 5.5"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                             bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Max Loan Limit
              </label>
              <input
                {...register("maxLoanLimit", { required: true })}
                type="number"
                placeholder="e.g. 500000"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Required Documents
              </label>
              <input
                {...register("requiredDocuments")}
                type="text"
                placeholder="e.g. NID, Passport, Bank Statement"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                EMI Plans
              </label>
              <input
                {...register("emiPlans")}
                type="text"
                placeholder="e.g. 3 Months, 6 Months, 1 Year"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Loan Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                {...register("showOnHome")}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
              />
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                Show on Home Page
              </label>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full mt-6 py-3.5 rounded-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-500 to-sky-600 
                         hover:from-blue-600 hover:to-sky-700 
                         shadow-md shadow-blue-500/30 transition-colors 
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading, please wait..." : "Add Loan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;
