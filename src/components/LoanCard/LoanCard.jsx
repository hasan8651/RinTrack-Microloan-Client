import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  const { _id, title, category, interest, maxLimit, image  } = loan;

  return (
    <div data-aos="fade-up" className="group relative h-full">
        <div className="absolute -inset-1px rounded-2xl bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-50 blur-sm transition duration-500 group-hover:opacity-100 group-hover:blur-md" />
            <div className="relative h-full rounded-2xl card-surface shadow-lg ring-1 ring-base-200 p-4 flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
               <figure className="relative  w-full overflow-hidden rounded-xl">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <span className="absolute right-3 bottom-3 badge section-gradient">{category}</span>
          <span className="absolute left-3 top-3 badge section-gradient text-base-content backdrop-blur">
            {interest}
          </span>
          <span className="absolute right-3 top-3 badge section-gradient px-3 py-1 text-sm font-semibold shadow">
            {maxLimit}
          </span>
        </figure>
        <h3 className="mt-4 text-lg font-semibold text-base-content line-clamp-2 min-h-14">
          {title}
        </h3>
        <div className="mt-auto pt-4">
          <Link to={`/loans/${_id}`} className="btn btn-gradient w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;