import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaShareSquare } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

const feedbackData = [
  {
    id: 1,
    name: "John Doe",
    role: "Borrower",
    message:
      "LoanLink made the loan process incredibly simple and fast. Highly recommended!",
    avatar: "/john_doe.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Borrower",
    message:
      "The verification process was quick, and I received my funds within 24 hours.",
    avatar: "/jane_smith.jpg",
  },
  {
    id: 3,
    name: "Ali Khan",
    role: "Borrower",
    message: "Excellent platform for microloans, very user-friendly interface.",
    avatar: "/public/ali_khan.jpg",
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Borrower",
    message: "Amazing support! Helped me throughout the entire process.",
    avatar: "/public/sarah_lee.jpg",
  },
];

const Feedback = () => {
  return (
    <section className="py-12 text-base-content transition-colors duration-300 bg-orange-50 dark:bg-transparent">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Customer Feedback
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          What our clients say about us
        </p>
      </div>

      <div className="container mx-auto px-2 sm:px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, centeredSlides: true },
            1024: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {feedbackData.map((feedback) => (
            <SwiperSlide key={feedback.id}>
              <div className="relative bg-orange-100 dark:bg-neutral-900/90 border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl rounded-2xl p-4 sm:p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start text-center sm:text-left">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-blue-300">
                      {feedback.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {feedback.role}
                    </p>
                  </div>
                </div>
                <p className="italic mt-3 text-gray-600 dark:text-gray-200 leading-relaxed text-sm sm:text-base text-left">
                  "{feedback.message}"
                </p>
                <div className="flex justify-between items-center mt-4 sm:mt-6">
                  <div className="flex text-blue-400 text-xs sm:text-sm">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} className="mr-1" />
                      ))}
                  </div>

                  <FaShareSquare className="text-blue-500 dark:text-blue-400 transition-colors text-base sm:text-lg" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;
