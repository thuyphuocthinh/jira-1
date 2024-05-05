import React from "react";
import Sidebar from "../../components/jira/Sidebar";
import Menu from "../../components/jira/Menu";
import { USER_INFO } from "../../utils/constants/SystemConstants";
import { history } from "../../utils/libs/history";
function WithHomeTemplate(WrappedComponent) {
  class WithHomeTemplate extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
      if (userInfo) {
        return (
          <>
            <Sidebar />
            <Menu />
            <div className="mainContent">
              <div className="container">
                <WrappedComponent {...this.props} />
              </div>
            </div>
          </>
        );
      } else {
        history.push("/login");
      }
    }
  }
  return WithHomeTemplate;
}

export default WithHomeTemplate;
