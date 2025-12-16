import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { imageUpload, showAlert } from "../../../utils";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UpdateLoans = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axiosSecure.get(`/loans/${id}`);
        setLoan(res.data);
      } catch (err) {
        console.error(err);
        showAlert({
          icon: "error",
          color: "pink",
          title: "Failed to load loan data",
          text: err.response?.data?.message || err.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id, axiosSecure]);

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

      await axiosSecure.patch(`/loans/${id}`, updatedData);

      showAlert({
        icon: "success",
        color: "lime",
        title: "Loan updated successfully!",
      });
      navigate(-1);
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        color: "pink",
        title: "Failed to update loan",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!loan)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-100 dark:bg-neutral-900">
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loan not found.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | Update {loan.title}</title>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <div className="bg-orange-100 dark:bg-neutral-900/90 border border-blue-400/20 rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
            Update Loan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Title
              </label>
              <input
                name="title"
                defaultValue={loan.title}
                placeholder="Loan title"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Category
                </label>
                <input
                  name="category"
                  defaultValue={loan.category}
                  placeholder="Category"
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
                  name="interestRate"
                  type="number"
                  step="0.1"
                  defaultValue={loan.interestRate}
                  placeholder="Interest Rate"
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
                name="maxLoanLimit"
                type="number"
                defaultValue={loan.maxLoanLimit}
                placeholder="Max Loan Limit"
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
                name="description"
                defaultValue={loan.description}
                placeholder="Description"
                className="w-full h-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                EMI Plans
              </label>
              <input
                name="emiPlans"
                defaultValue={loan.emiPlans}
                placeholder="3 Months, 6 Months"
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
                name="requiredDocuments"
                defaultValue={loan.requiredDocuments}
                placeholder="NID, Passport"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {loan.image && (
                <img
                  src={loan.image}
                  alt="Loan"
                  className="mt-3 w-32 h-20 object-cover rounded-md border border-gray-200 dark:border-neutral-700"
                />
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="showOnHome"
                defaultChecked={loan.showOnHome}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
              />
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                Show on Home
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-1/2 py-3 rounded-lg font-semibold 
               border border-gray-300 dark:border-neutral-700
               bg-white dark:bg-neutral-900 
               text-gray-700 dark:text-gray-200
               hover:bg-gray-50 dark:hover:bg-neutral-800
               transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 rounded-lg font-semibold text-white 
               bg-gradient-to-r from-blue-500 to-sky-600 
               hover:from-blue-600 hover:to-sky-700 
               shadow-md shadow-blue-500/30 transition-colors cursor-pointer"
              >
                Update Loan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLoans;
