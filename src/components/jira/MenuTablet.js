import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CLOSE_CANVAS,
  OPEN_CANVAS,
} from "../../redux/constants/OffCanvasConstants";
import { NavLink } from "react-router-dom";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/constants/LoadingConstants";
import { USER_INFO, USER_TOKEN } from "../../utils/constants/SystemConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { history } from "../../utils/libs/history";
import { useEffect } from "react";

export default function MenuTablet() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.NavLinkReducer);
  const { isCanvasOpen } = useSelector((state) => state.OffCanvasReducer);
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);
  const openCanvas = () => {
    dispatch({ type: OPEN_CANVAS });
  };
  const closeCanvas = () => {
    dispatch({ type: CLOSE_CANVAS });
  };
  return (
    <>
      <Offcanvas show={isCanvasOpen} onHide={closeCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="menuTablet">
            <div className="menuBar-container">
              <div className="menuBar-header">
                <div className="menuBar-avatar">
                  <img src={user?.avatar} alt="avatar-default-icon" />
                </div>
                <div className="menuBar-user">
                  <p style={{ width: "100%" }}> {user?.name}</p>
                </div>
              </div>
              <div className="menuBar-body">
                <div className="menuBar-top">
                  <ul>
                    <li
                      onClick={() => {
                        dispatch({ type: CLOSE_CANVAS });
                      }}
                    >
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
                    <li
                      onClick={() => {
                        dispatch({ type: CLOSE_CANVAS });
                      }}
                    >
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
                    <li
                      onClick={() => {
                        dispatch({ type: CLOSE_CANVAS });
                      }}
                    >
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
                    <li
                      onClick={() => {
                        dispatch({ type: CLOSE_CANVAS });
                      }}
                    >
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
                        onClick={() => {
                          dispatch({ type: CLOSE_CANVAS });
                        }}
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
                        dispatch({ type: CLOSE_CANVAS });
                        NotifyFunction(
                          "success",
                          "Success",
                          "Logout successfully"
                        );
                      }, 500);
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
