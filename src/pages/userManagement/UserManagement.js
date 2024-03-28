import React, { useEffect, useState } from "react";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import { Avatar, Button, Form, Input, Popconfirm, Space, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER_SAGA,
  GET_USER_INFO,
} from "../../redux/constants/UserConstants";
import { useSelector } from "react-redux";
import { OPEN_DRAWER } from "../../redux/constants/DrawerConstants";
import DrawerFormEditUser from "../../components/drawer/DrawerFormEditUser";

function UserManagement() {
  const dispatch = useDispatch();
  const { arrUsers } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SAGA,
      payload: "",
    });
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const handleSearch = (values) => {
    if (values.keyword) {
      dispatch({
        type: GET_ALL_USER_SAGA,
        payload: values.keyword,
      });
    }
  };
  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (!value || value === "") {
      dispatch({
        type: GET_ALL_USER_SAGA,
        payload: "",
      });
    }
  };
  const openDrawer = (userInfo) => {
    console.log("userInfo", userInfo);
    dispatch({
      type: OPEN_DRAWER,
      Component: <DrawerFormEditUser />,
      title: "Edit user",
    });
    dispatch({
      type: GET_USER_INFO,
      payload: userInfo,
    });
  };
  const deleteUser = (userInfo) => {
    dispatch({
      type: DELETE_USER_SAGA,
      payload: userInfo.userId,
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value),
      sorter: (item1, item2) => item2.userId - item1.userId,
      sortOrder: sortedInfo.columnKey === "userId" ? sortedInfo.order : null,
      responsive: ["md"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return <Avatar src={record.avatar} alt={record.avatar} key={index} />;
      },
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (item2, item1) => {
        let name1 = item1.name?.trim().toLowerCase();
        let name2 = item2.name?.trim().toLowerCase();
        return name2 > name1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item2, item1) => {
        let email1 = item1.email?.trim().toLowerCase();
        let email2 = item2.email?.trim().toLowerCase();
        return email2 > email1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      responsive: ["md"],
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Button
              type="primary"
              className="me-2"
              onClick={() => openDrawer(record)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this user?"
              onConfirm={() => deleteUser(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ backgroundColor: "red", color: "white" }}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h4 className="text-center m-0 p-0">User Management</h4>
      <div>
        <div
          style={{
            width: "100%",
            marginBottom: 16,
          }}
          className="my-4"
        >
          <Form onFinish={handleSearch}>
            <Form.Item name="keyword" style={{ width: "100%" }}>
              <Input
                style={{ height: "35px" }}
                placeholder="Search user..."
                className="w-100"
                onChange={handleSearchChange}
                suffix={
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="d-flex align-items-center justify-content-center"
                    style={{ position: "absolute", right: "0" }}
                  >
                    <SearchOutlined className="site-form-item-icon" />
                  </Button>
                }
              />
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={arrUsers}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default WithHomeTemplate(UserManagement);
