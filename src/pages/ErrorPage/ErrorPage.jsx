import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-full mx-auto flex-1 bg-orange-50 dark:bg-transparent">
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <img src="/error-404.png" alt="404 page" className="w-96 my-4" />
        <h1 className="text-4xl font-extrabold text-red-600 mb-2">
          Oops, page not found!
        </h1>
        <p className="text-red-700 mb-6">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="w-50 mt-6 py-3.5 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white text-xl shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out cursor-pointe">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
