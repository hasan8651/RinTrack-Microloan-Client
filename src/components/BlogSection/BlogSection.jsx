import { Link } from "react-router";
import { blogPosts } from "../../utils/blogs";
import { FaArrowRight } from "react-icons/fa";

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
             <Link
                to={`/blog/${post.id}`}
                className="btn btn-link mt-2 pl-0 text-blue-600 dark:text-blue-400 hover:no-underline group"
              >
                Read More 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
