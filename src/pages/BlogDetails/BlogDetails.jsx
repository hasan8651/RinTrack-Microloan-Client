import { useParams, Link } from "react-router";
import { blogPosts } from "../../utils/blogs";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  

  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-red-500">Blog not found!</h2>
        <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-blue-400/20">
        

        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
               </div>

  
        <div className="p-6 sm:p-10">
          
  
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500"/> {blog.date}
            </span>
            <span className="flex items-center gap-2">
                <FaUser className="text-blue-500"/> {blog.author}
            </span>
          </div>

    
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>


         <div 
  className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
  dangerouslySetInnerHTML={{ __html: blog.content }} 
>
  
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;