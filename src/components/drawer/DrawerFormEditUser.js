import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import WithDrawerHOC from "../../HOC/drawerHOC/DrawerHOC";
import { useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/constants/DrawerConstants";
import { useSelector } from "react-redux";
import { UPDATE_USER_SAGA } from "../../redux/constants/UserConstants";
const { Option } = Select;

export default function DrawerFormEditUser(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userId, name, phoneNumber, email } = useSelector(
    (state) => state.UserReducer.userInfo
  );
  const closeDrawer = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      id: userId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    });
  }, [userId, name, email, phoneNumber]);

  const handleSubmit = (values) => {
    dispatch({
      type: UPDATE_USER_SAGA,
      payload: values,
    });
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        requiredMark
        onFinish={handleSubmit}
        preserve={false}
        scrollToFirstError={true}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="id" label="User ID" initialValue={userId}>
              <Input disabled readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your new Name",
                },
              ]}
              initialValue={name}
            >
              <Input placeholder="Enter your new Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your new Email",
                },
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid Email",
                },
              ]}
              initialValue={email}
            >
              <Input placeholder="Enter your new Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              initialValue={phoneNumber}
              rules={[
                {
                  required: true,
                  message: "Please enter your new Phone Number",
                },
                {
                  len: 10,
                  message: "The lenght of phone number is 10",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your new Number"
                value={phoneNumber}
              />
            </Form.Item>
          </Col>
        </Row>
        <Space className="d-flex justify-content-end align-items-center">
          <Button onClick={closeDrawer}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </>
  );
}

//  WithDrawerHOC(DrawerFormEditUser); // Applying HOC to export
