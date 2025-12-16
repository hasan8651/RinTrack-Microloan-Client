import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-full mx-auto flex-1 bg-red-200">
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center text-center py-12 px-6 shadow-lg">
        <img src="/error-404.png" alt="404 page" className="w-96 my-4" />
        <h1 className="text-4xl font-extrabold text-red-600 mb-2">
          Oops, page not found!
        </h1>
        <p className="text-red-700 mb-6">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="btn btn-error">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
