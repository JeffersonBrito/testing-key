import React from "react";
import "./Navbar.scss";
import { ReactComponent as LogoutIcon } from "../../../assets/images/navbar/logoutIcon.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');

  function getInitials(fullName) {
    if (fullName) {
      const nameParts = fullName?.split(" ");
      const initials = nameParts
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

      return initials;
    }
    return "";
  }

  function logout() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <nav className="Navbar">
      <div className="infos-navbar">
        <p className="image-info">{getInitials(userInfo)}</p>
        <p className="name">Olá, {userInfo}</p>
        <button
          onClick={logout}
          aria-label="Logout"
          title="Logout"
          className="logout"
        >
          <LogoutIcon aria-hidden="true" />
          <span class="accessibility-only">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
