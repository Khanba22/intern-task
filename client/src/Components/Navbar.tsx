import { useState } from "react";
import userServices from "../services/UserServices";
import { Link, useParams } from "react-router-dom";

const Navbar = ({ isHome }: { isHome: boolean }) => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  const toggleAvatarDropdown = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
  };

  const logout = () => {
    userServices.doLogout();
  };

  const { roomId } = useParams();

  const copyJoinInfo = () => {
    navigator.clipboard.writeText(`${roomId}`);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg px-5 navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Projects
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`d-flex w-25 align-items-center justify-content-end px-5`}
        >
          <div className="dropdown">
            <button
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              id="navbarDropdownMenuAvatar"
              aria-expanded={isAvatarDropdownOpen ? "true" : "false"}
              onClick={toggleAvatarDropdown}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                isAvatarDropdownOpen ? "show" : ""
              }`}
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <Link className="dropdown-item" to="#">
                  My profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={copyJoinInfo}>
                  Joining Link
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
