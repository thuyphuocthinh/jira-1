import React from "react";
import WithAuthenticationTemplate from "../../templates/AuthenticationTemplate/AuthenticationTemplate";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SAGA } from "../../redux/constants/AuthenticationConstants";

function Login() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch({
      type: LOGIN_SAGA,
      payload: values,
    });
  };
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div>
        <h4 className="text-center mb-4">Jira Login</h4>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid Email",
              },
            ]}
            style={{ width: "350px" }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="passWord"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 8,
                message: "Password must contain at least 8 characters",
              }
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-100"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <p className="m-0 p-0">Does not have an account?</p>
          <NavLink to="/signup">
            {" "}
            <Button type="link">Signup</Button>{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default WithAuthenticationTemplate(Login);
