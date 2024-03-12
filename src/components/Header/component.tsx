import { FaBeer, FaHeart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../store/auth/auth.api";
import style from "./component.module.scss";

interface Menu {
  label: string;
  path: string;
  icon?: React.ReactElement;
  exact?: boolean;
}

const menu: Menu[] = [
  {
    label: "Routine",
    path: "/",
    icon: <FaBeer />,
    exact: true,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

export const Header = () => {
  const [logout] = useLogoutMutation();
  const onLogout = () => {
    logout();
  };

  return (
    <header className={style.header}>
      <div className="flex flex-row gap-10 ml-5 mr-5">
        {menu.map((s: Menu) => (
          <NavLink
            end
            key={s.path}
            className={({ isActive }) => {
              let className = "flex items-center gap-2 text-white  ";
              if (isActive) {
                className += "font-bold text-red-600";
              } else {
                className += "font-light";
              }

              return className;
            }}
            to={s.path}
          >
            {s.icon} {s.label}
          </NavLink>
        ))}
      </div>
      <button className={style.logout} onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};
