import React, { useState, useEffect } from "react";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import {
  AutoComplete,
  Avatar,
  Button,
  Form,
  Input,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import { useDispatch } from "react-redux";
import {
  ASSIGN_USER_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_SINGLE_PROJECT_INFO,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../../redux/constants/ProjectConstants";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import {
  GET_USER_BY_KEYWORD_SAGA,
  VERIFY_TOKEN_SAGA,
} from "../../redux/constants/UserConstants";
import { OPEN_DRAWER } from "../../redux/constants/DrawerConstants";
import DrawerFormEditProject from "../../components/drawer/DrawerFormEditProject";
import { NavLink } from "react-router-dom";

const categoryColor = {
  "Dự án web": "magenta",
  "Dự án phần mềm": "green",
  "Dự án di động": "cyan",
};

const options = [
  {
    value: "Burns Bay Road",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Wall Street",
  },
];

function ProjectManagement(props) {
  // hooks
  const [memberSearchValue, setMemberSearchValue] = useState("");
  const dispatch = useDispatch();
  const { arrProjects } = useSelector((state) => state.ProjectReducer);
  const { arrUsersByKeyword } = useSelector((state) => state.UserReducer);
  const { isVerified } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
      payload: "",
    });
  }, [isVerified]);
  const searchRef = useRef();
  const [searchProjectKeyword, setSearchProjectKeyword] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // methods
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
  const deleteProject = (projectId) => {
    dispatch({
      type: DELETE_PROJECT_SAGA,
      payload: projectId,
    });
  };
  const handleSearch = (values) => {
    // console.log(values);
    setSearchProjectKeyword(values.keyword);
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
      payload: values.keyword,
    });
  };
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchProjectKeyword(value);
    if (!value || value === "") {
      dispatch({
        type: GET_ALL_PROJECT_SAGA,
        payload: "",
      });
    }
  };
  const openDrawer = (projectInfo) => {
    dispatch({
      type: OPEN_DRAWER,
      Component: <DrawerFormEditProject />,
      title: "Edit project",
    });
    dispatch({
      type: GET_SINGLE_PROJECT_INFO,
      payload: projectInfo,
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (item1, item2) => item2.id - item1.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let name1 = item1.projectName?.trim().toLowerCase();
        let name2 = item2.projectName?.trim().toLowerCase();
        return name2 > name1 ? -1 : 1;
      },
      ellipse: true,
      sortOrder:
        sortedInfo.columnKey === "projectName" ? sortedInfo.order : null,
      render: (text, record, index) => {
        return (
          <NavLink
            key={index}
            to={`project/${record.id}`}
            className="projectName-link"
          >
            {record.projectName}
          </NavLink>
        );
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      sorter: (item2, item1) => {
        let creator1 = item1.creator.name?.trim().toLowerCase();
        let creator2 = item2.creator.name?.trim().toLowerCase();
        return creator2 > creator1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "creator" ? sortedInfo.order : null,
      render: (text, record, index) => {
        return (
          <>
            <Tag key={index}>{record.creator.name}</Tag>
          </>
        );
      },
      responsive: ["md"],
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      responsive: ["md"],
      render: (text, record, index) => {
        return (
          <Tag key={index} color={categoryColor[record.categoryName]}>
            {record.categoryName}
          </Tag>
        );
      },
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        return categoryName2 > categoryName1 ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      responsive: ["lg"],
      render: (text, record, index) => {
        let length = record.members?.length;
        return (
          <>
            <div
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <Popover
                placement="bottom"
                title="Members"
                content={() => {
                  return (
                    <table
                      style={{ width: "400px", verticalAlign: "middle" }}
                      className="text-center"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.members?.map((member, index) => {
                          return (
                            <tr>
                              <td>{member.userId}</td>
                              <td>
                                <Avatar
                                  src={member.avatar}
                                  alt={member.avatar}
                                />
                              </td>
                              <td>{member.name}</td>
                              <td>
                                <Button
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    margin: "auto",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: REMOVE_USER_FROM_PROJECT_SAGA,
                                      payload: {
                                        projectId: record.id,
                                        userId: member.userId,
                                      },
                                    });
                                  }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <DeleteOutlined />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  );
                }}
              >
                <div className="d-flex align-items-center">
                  {record.members?.slice(0, 2).map((member, index) => {
                    return (
                      <Avatar
                        src={member.avatar}
                        alt={member.avatar}
                        key={index}
                      />
                    );
                  })}
                  {length > 2 && <Avatar>...</Avatar>}
                </div>
              </Popover>
              <Popover
                placement="bottom"
                title="Add new members"
                content={() => {
                  return (
                    <AutoComplete
                      style={{
                        width: 200,
                      }}
                      options={arrUsersByKeyword.map((user, index) => {
                        return {
                          label: user.name,
                          value: user.userId.toString(),
                        };
                      })}
                      onSearch={(value) => {
                        if (searchRef.current) {
                          clearTimeout();
                        }
                        searchRef.current = setTimeout(() => {
                          dispatch({
                            type: GET_USER_BY_KEYWORD_SAGA,
                            payload: value,
                          });
                        }, 500);
                      }}
                      value={memberSearchValue}
                      onChange={(value, option) => {
                        setMemberSearchValue(option.label);
                      }}
                      onSelect={(value, option) => {
                        setMemberSearchValue(option.label);
                        dispatch({
                          type: ASSIGN_USER_PROJECT_SAGA,
                          payload: {
                            projectId: record.id,
                            userId: value,
                          },
                          searchProjectKeyword,
                        });
                      }}
                      placeholder={"Type to search members..."}
                    />
                  );
                }}
              >
                <Button> + </Button>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Button
              type="primary"
              className="me-2"
              classNames="d-flex align-items-center justify-content-center"
              onClick={() => openDrawer(record)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete project"
              description="Are you sure to delete this project?"
              onConfirm={() => deleteProject(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                classNames="d-flex align-items-center justify-content-center"
              >
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
      <h4 className="text-center m-0 p-0">Project Management</h4>
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
                onChange={handleSearchChange}
                style={{ height: "35px" }}
                placeholder="Search project..."
                className="w-100"
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
          dataSource={arrProjects}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default WithHomeTemplate(ProjectManagement);
