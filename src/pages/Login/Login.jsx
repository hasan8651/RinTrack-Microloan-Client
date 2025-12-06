import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { loginFunction, setUser, loginPopFunction, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleReset = () => {
    Swal.fire({
      position: "top-end",
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      icon: "success",
      title: "This link isn't functional for now. (I'll do it after result)",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleGoogleLogin = () => {
    loginPopFunction()
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          position: "top-end",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "error",
          title: "Failed to log in with Google.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginFunction(email, password)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          position: "top-end",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "error",
          title: "Login failed. Please check your credentials.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>Study Pilot - Login</title>
      </Helmet>
      <div className="hero">
        <title>Study Pilot - Login</title>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card w-full shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <p className="text-center text-purple-600 text-lg font-semibold mb-4">
                  Login to Your Account
                </p>
                <label className="font-semibold">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="example@email.com"
                  className=" input input-bordered"
                  required
                />
              </div>

              <div className="form-control relative">
                <label className="font-semibold">
                  <span>Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <span
                  className="absolute text-primary right-2 top-8 cursor-pointer z-50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibility size={20} />
                  ) : (
                    <MdVisibilityOff size={20} />
                  )}
                </span>
              </div>

              <label className="label">
                <Link
                  onClick={handleReset}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="form-control">
                <button type="submit" className="btn w-full btn-gradient">
                  Login
                </button>
              </div>

              <div>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 text-purple-600 flex items-center justify-center w-full"
                >
                  <img
                    className="w-5 mr-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                  />
                  Continue with Google
                </button>
              </div>
            </form>

            <p className="text-center text-purple-600 p-4">
              Don't have an account?{" "}
              <Link className="text-red-500 font-semibold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
