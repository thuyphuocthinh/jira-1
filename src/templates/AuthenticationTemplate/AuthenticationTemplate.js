import React from "react";
import { Layout } from "antd";
const { Content, Sider } = Layout;

function WithAuthenticationTemplate(WrappedComponent) {
  class WithAuthenticationTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        height: window.innerHeight,
      };
    }
    render() {
      return (
        <>
          <Layout>
            <Sider
              width="50%"
              style={{
                background: "blue",
                height: this.state.height,
                backgroundImage: `url(${require("../../assets/jiraImage/authenticationFormImg.png")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="d-none d-md-block"
            >
            </Sider>
            <Content
              width="50%"
              style={{
                height: this.state.height,
                background: "white",
                borderRadius: "5px",
              }}
            >
              <WrappedComponent {...this.props} />
            </Content>
          </Layout>
        </>
      );
    }
  }
  return WithAuthenticationTemplate;
}

export default WithAuthenticationTemplate;
