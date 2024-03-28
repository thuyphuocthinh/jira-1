import React from "react";
import WithAuthenticationTemplate from "../../templates/AuthenticationTemplate/AuthenticationTemplate";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGNUP_SAGA } from "../../redux/constants/AuthenticationConstants";

function Signup() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch({
      type: SIGNUP_SAGA,
      payload: values,
    });
  };
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div>
        <h4 className="text-center mb-4">Jira Signup</h4>
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
              {
                len: 10,
                message: "The length of phone number is 10",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-100"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <p className="p-0 m-0">Already have an account?</p>
          <NavLink to="/login">
            {" "}
            <Button type="link">Login</Button>{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default WithAuthenticationTemplate(Signup);
