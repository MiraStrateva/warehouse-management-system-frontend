import { NavLink, useRouteLoaderData, useNavigate } from "react-router-dom";
import { action as logoutAction } from "../pages/Logout";

import "./MainNavigation.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          {token ? (
            <>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/warehouses"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Warehouses
                </NavLink>
              </li>
            </>
          ) : null}
          <ul className="list right-list">
            {!token ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logoutAction();
                    navigate("/");
                    navigate(0);
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
