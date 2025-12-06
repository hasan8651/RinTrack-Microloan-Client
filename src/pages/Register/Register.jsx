import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { saveOrUpdateUser } from "../../utils";

const Register = () => {
  const {createUserFunction, setUser, updateProfileFunction, loginPopFunction} = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

const handleGoogleLogin = async () => {
  const from = location?.state?.from?.pathname || "/";

  try {
    // Firebase google popup login
    const result = await loginPopFunction();
    const user = result.user;

    // Save or update user in database
    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    });

    // Update React state
    setUser(user);

    Swal.fire({
      position: "top-end",
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      icon: "success",
      title: "Logged in successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate(from, { replace: true });
  } catch (err) {
    setError(err.code);
    

    Swal.fire({
      position: "top-end",
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      icon: "error",
      title: "Failed to log in with Google.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

 const handleRegister = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const photoURL = e.target.photoURL.value;
  const password = e.target.password.value;

  // Validate password
  if (!passwordValidation(password)) {
    setPasswordError(
      "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
    );
    return;
  }

  setPasswordError("");
  setError("");

  try {
    // Create Firebase user
    const result = await createUserFunction(email, password);
    const user = result.user;

    // Update Firebase profile (name + photo)
    await updateProfileFunction({
      displayName: name,
      photoURL: photoURL,
    });

    // Save or update user in DB
    await saveOrUpdateUser({
      name: name,
      email: email,
      image: photoURL,
    });

    // Update React user state
    setUser({
      ...user,
      displayName: name,
      photoURL: photoURL,
    });

    Swal.fire({
      position: "top-end",
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      icon: "success",
      title: "Registered successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  } catch (err) {
    setError(err.code || "Registration failed.");

    Swal.fire({
      position: "top-end",
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      icon: "error",
      title: "Registration failed. Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};


  return (
    <div>
      <Helmet>
        <title>RinTrack - Register</title>
      </Helmet>
      <div className="hero">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <p className="text-center text-purple-600 font-semibold text-lg mb-4">
                  Register Your Account
                </p>
                <label className="font-semibold">
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="font-semibold">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="font-semibold">
                  <span>Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="font-semibold">
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-primary right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-50"
                  >
                    {showPassword ? (
                      <MdVisibility size={20} />
                    ) : (
                      <MdVisibilityOff size={20} />
                    )}
                  </span>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm max-w-[280px]">
                    {passwordError}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-sm max-w-[280px]">{error}</p>
                )}
              </div>
              <div className="form-control">
                <button type="submit" className="btn w-full btn-gradient  ">
                  Register
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
            <p className="text-purple-600 text-center p-4">
              Already have an account?{" "}
              <Link className="text-red-500 font-semibold" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
