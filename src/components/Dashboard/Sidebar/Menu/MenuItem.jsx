import { NavLink } from "react-router";

const MenuItem = ({ label, address, linkClass, icon : Icon, end = false }) => {
  return (
    <NavLink to={address} end={end} className={linkClass}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
