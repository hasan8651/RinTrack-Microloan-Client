import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 overflow-hidden relative bg-base-100 text-base-content">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6366f1,transparent_50%)]" />
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        <div className="lg:w-1/2 text-center lg:text-left">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Get Microloans <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Instantly
            </span>{" "}
            with RinTrack
          </h1>

          
          <p className="text-base sm:text-lg text-base-content/80 mb-8 max-w-2xl mx-auto lg:mx-0">
            No paperwork. No waiting. Apply in 2 minutes, get approved in
            seconds, money in your account today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* 1st CTA */}
            <button
              onClick={() => navigate("/apply-loan")}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-orange-500 text-black font-bold text-base px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="relative z-10">Apply for Loan Now</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            {/* 2nd CTA */}
            <button
              onClick={() => navigate("/all-loans")}
              className="border-2 border-base-content/50 hover:border-base-content backdrop-blur-sm hover:bg-base-content/10 font-semibold text-base px-6 py-3 rounded-xl transition-all duration-300"
            >
              Explore All Loans →
            </button>
          </div>

          {/* Trust badge */}
          <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm text-base-content/60">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right side Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <img
            src="https://wemabank.com/assets/Wema%20Bank%20Salary%20Based%20Loan-WuTcJiQp.jpg"
            alt="Instant Loan Approval - RinTrack"
            className="w-full max-w-xl mx-auto drop-shadow-xl rounded-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
