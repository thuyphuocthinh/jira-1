import React from "react";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import { Avatar, Button, Form, Input } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { USER_INFO } from "../../utils/constants/SystemConstants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_USER_SAGA } from "../../redux/constants/UserConstants";
function Profile() {
  const { id, email, name, phoneNumber, avatar } = JSON.parse(
    localStorage.getItem(USER_INFO)
  );
  const dispatch = useDispatch();

  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <h4 className="text-center">Profile</h4>
        {!isUpdate ? (
          <Form layout="vertical" requiredMark>
            <div className="text-center my-3">
              <img
                style={{ borderRadius: "50%", width: "100px" }}
                src={avatar}
                alt={avatar}
              />
            </div>
            <Form.Item label="Name" name="name" initialValue={name}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              initialValue={phoneNumber}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone Number"
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Email"
              style={{ width: "100%" }}
              initialValue={email}
              name="email"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                readOnly
              />
            </Form.Item>
            {/* <Form.Item> */}
            <Button
              className="w-100"
              type="link"
              htmlType="button"
              onClick={() => setIsUpdate(!isUpdate)}
            >
              Click To Open Update Form
            </Button>
            {/* </Form.Item> */}
          </Form>
        ) : (
          <Form
            layout="vertical"
            requiredMark
            onFinish={(values) => {
              dispatch({
                type: UPDATE_USER_SAGA,
                payload: {
                  id,
                  email: values.email,
                  name: values.name,
                  phoneNumber: values.phoneNumber,
                },
              });
              setTimeout(() => {
                setIsUpdate(!isUpdate);
              }, 500);
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={name}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={phoneNumber}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone Number"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              style={{ width: "100%" }}
              initialValue={email}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <div className="d-flex gap-2">
              <Button
                className="w-50"
                type="default"
                htmlType="button"
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Cancel
              </Button>
              <Button className="w-50" type="primary" htmlType="submit">
                Update
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default WithHomeTemplate(Profile);
