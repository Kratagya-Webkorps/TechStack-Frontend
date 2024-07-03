import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`;
      const isLast = index === location.pathname.split("/").filter((crumb) => crumb !== "").length - 1;

      return (
        <div className="crumb font-bold" key={crumb}>
          {!isLast ? (
            <Link to={currentLink}>
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </Link>
          ) : (
            <span>
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </span>
          )}
        </div>
      );
    });

  return (
    <div className="breadcrumbs text-sky-500 px-6">
      <Link to="/" className="font-bold ">Home &gt;</Link>
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
