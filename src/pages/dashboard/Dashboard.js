import React from "react";
import Breadcrumb from "../../components/jira/main/Breadcrumb";
import MainContenHeader from "../../components/jira/main/MainContenHeader";
import MainContentBody from "../../components/jira/main/MainContentBody";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constants/ProjectConstants";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { GET_PROJECT_LINK_ID } from "../../redux/constants/NavLinkConstants";

function Dashboard(props) {
  // hooks
  const dispatch = useDispatch();
  const { id } = props.match?.params;
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  // method
  useEffect(() => {
    if (id !== ":id") {
      dispatch({
        type: GET_PROJECT_DETAIL_SAGA,
        payload: id,
        isLoading: true,
      });
      dispatch({
        type: GET_PROJECT_LINK_ID,
        payload: id,
      });
    }
  }, []);
  return id !== ":id" ? (
    <>
      <Breadcrumb projectDetail={projectDetail} />
      <MainContenHeader projectDetail={projectDetail} />
      <MainContentBody projectDetail={projectDetail} />
    </>
  ) : (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong. Go back to project management to choose a project"
        extra={
          <Button type="primary">
            <NavLink to="/projectmanagement">Project Management</NavLink>
          </Button>
        }
      />
    </div>
  );
}

export default WithHomeTemplate(Dashboard);
