import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-full mx-auto flex-1">
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <img src="/error-404.png" alt="404 page" className="w-96 my-4" />
        <h1 className="text-4xl font-extrabold text-purple-600 mb-2">
          Oops, page not found!
        </h1>
        <p className="text-purple-600 mb-6">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="btn btn-gradient">
          Go to Homepage
          
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
