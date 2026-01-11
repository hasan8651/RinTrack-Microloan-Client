const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Track Microloans Efficiently",
    excerpt:
      "Learn how to manage borrowers, repayments, and balances quickly and accurately using RinTrack.",
    image:
      "https://via.placeholder.com/400x250?text=Microloan+Tips",
    link: "#",
  },
  {
    id: 2,
    title: "Why Microfinance Needs a Tracking System",
    excerpt:
      "Discover the importance of a centralized microloan tracker and how it reduces errors and delays.",
    image:
      "https://via.placeholder.com/400x250?text=Microfinance+System",
    link: "#",
  },
  {
    id: 3,
    title: "Top Features of RinTrack You Should Know",
    excerpt:
      "Explore the key features of RinTrack that make microloan management simple and effective.",
    image:
      "https://via.placeholder.com/400x250?text=RinTrack+Features",
    link: "#",
  },
];

const BlogsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Latest Blogs
        </h2>
        <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
          Stay updated with tips, news, and insights on microloan management.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="card-body">
              <h3 className="card-title mb-4 text-gray-900 dark:text-blue-300">{post.title}</h3>
              <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">{post.excerpt}</p>
              <a
                href={post.link}
                className="btn btn-link mt-2"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
