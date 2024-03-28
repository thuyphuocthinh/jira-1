import Avatar from "antd/es/avatar/avatar";
import React from "react";
import { USER_INFO, USER_TOKEN } from "../../utils/constants/SystemConstants";
import { Button } from "antd";
import { history } from "../../utils/libs/history";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { useDispatch } from "react-redux";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/constants/LoadingConstants";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

export default function Menu() {
  const dispatch = useDispatch();
  const { avatar, name } = JSON.parse(localStorage.getItem(USER_INFO));
  const { id } = useSelector((state) => state.NavLinkReducer);
  return (
    <div className="menuBar">
      <div className="menuBar-container">
        <div className="menuBar-header">
          <div className="menuBar-avatar">
            <img src={avatar} alt="avatar-default-icon" />
          </div>
          <div className="menuBar-user">
            <p>{name}</p>
          </div>
        </div>
        <div className="menuBar-body">
          <div className="menuBar-top">
            <ul>
              <li>
                <NavLink
                  to={`/project/${id}` || "/project/:id"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <i className="fa-solid fa-briefcase" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/createproject"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <i className="fa-solid fa-gear" />
                  Create Project
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usermanagement"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <i className="fa-solid fa-user" />

                  User Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/projectmanagement" || "/"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <i className="fa-solid fa-list-check" />

                  Project Management
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <div className="menuBar-middle">
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-truck" />
                  Releases
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-filter" />
                  Issues and Filters
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-file" />
                  Pages
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-flag" />
                  Reports
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-box" />
                  Components
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="menuBar-bottom">
            <ul className="mb-3">
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <i className="fa-solid fa-user" />
                  Profile
                </NavLink>
              </li>
            </ul>
            <Button
              type="primary"
              className="w-100"
              onClick={() => {
                dispatch({ type: DISPLAY_LOADING });
                history.push("/login");
                localStorage.removeItem(USER_TOKEN);
                localStorage.removeItem(USER_INFO);
                setTimeout(() => {
                  dispatch({ type: HIDE_LOADING });
                  NotifyFunction("success", "Success", "Logout successfully");
                }, 500);
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
