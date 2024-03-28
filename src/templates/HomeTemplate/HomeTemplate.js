import React from "react";
import Sidebar from "../../components/jira/Sidebar";
import Menu from "../../components/jira/Menu";

function WithHomeTemplate(WrappedComponent) {
  class WithHomeTemplate extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
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
    }
  }
  return WithHomeTemplate;
}

export default WithHomeTemplate;
