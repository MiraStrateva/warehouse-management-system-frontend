import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <Form className="form" action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
