import {
  Col,
  Form,
  Row,
  Slider,
  Select,
  Input,
  Space,
  Button,
  InputNumber,
} from "antd";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/constants/DrawerConstants";
import { GET_TASK_TYPE_SAGA } from "../../redux/constants/TaskTypeConstants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GET_STATUS_SAGA } from "../../redux/constants/StatusConstants";
import { GET_PRIORITY_SAGA } from "../../redux/constants/PriorityConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../redux/constants/UserConstants";
import { useState } from "react";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL_SAGA,
} from "../../redux/constants/ProjectConstants";
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
export default function DrawerFromCreateTask() {
  // Hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const { arrProjects } = useSelector((state) => state.ProjectReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUsersByProjectId } = useSelector((state) => state.UserReducer);
  // Methods
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA, payload: "" });
    dispatch({ type: GET_TASK_TYPE_SAGA });
    dispatch({ type: GET_STATUS_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
  }, []);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };
  const closeDrawer = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
    form.setFieldsValue({
      listUserAsign: "",
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: "",
      priorityId: "",
    });
  };
  const handleSubmit = (values) => {
    dispatch({
      type: CREATE_TASK_SAGA,
      payload: {
        listUserAsign: values.listUserAssign,
        taskName: values.taskName,
        description: values.description?.level.content,
        statusId: values.statusId,
        originalEstimate: values.originalEstimate,
        timeTrackingSpent: values.timeTrackingSpent,
        timeTrackingRemaining: values.timeTrackingRemaining,
        projectId: values.projectId,
        typeId: values.typeId,
        priorityId: values.priorityId,
      },
    });
    form.setFieldsValue({
      listUserAsign: "",
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: "",
      priorityId: "",
    });
  };
  return (
    <div>
      <Form
        form={form}
        requiredMark
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          listUserAsign: "",
          taskName: "",
          description: "",
          statusId: "",
          originalEstimate: 0,
          timeTrackingSpent: 0,
          timeTrackingRemaining: 0,
          projectId: "",
          typeId: "",
          priorityId: "",
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="taskName"
              label="Task Name"
              rules={[
                {
                  required: true,
                  message: "Please input Task Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="projectId"
              label="Project"
              rules={[
                {
                  required: true,
                  message: "Please select Project",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Project Name"
                options={arrProjects?.map((project, index) => {
                  return {
                    label: project.projectName,
                    value: project.id,
                  };
                })}
                onSelect={(value) => {
                  dispatch({
                    type: GET_USER_BY_PROJECT_ID_SAGA,
                    payload: value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="statusId"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select Status",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Status"
                options={arrStatus?.map((status, index) => {
                  return {
                    label: status.statusName,
                    value: status.statusId,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="typeId"
              label="Task Type"
              rules={[
                {
                  required: true,
                  message: "Please select Task Type",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Task Type"
                options={arrTaskType?.map((taskType, index) => {
                  return {
                    label: taskType.taskType,
                    value: taskType.id,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priorityId"
              label="Priority"
              rules={[
                {
                  required: true,
                  message: "Please select Priority",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Priority"
                options={arrPriority?.map((priority, index) => {
                  return {
                    label: priority.priority,
                    value: priority.priorityId,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <p>Time Tracking (hours)</p>
            <Slider
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={Number(timeTracking.timeTrackingSpent)}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Original Estimate"
              name="originalEstimate"
              rules={[
                {
                  required: true,
                  message: "Please input Original Estimate",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Time spent"
              name="timeTrackingSpent"
              rules={[
                {
                  required: true,
                  message: "Please input Time Spent",
                },
              ]}
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });
              }}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Time Remaining"
              name="timeTrackingRemaining"
              rules={[
                {
                  required: true,
                  message: "Please input Time Remaining",
                },
              ]}
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: e.target.value,
                });
              }}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Assigness"
              name="listUserAssign"
              rules={[
                {
                  required: true,
                  message: "Please select Assignee",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Assignee"
                options={arrUsersByProjectId?.map((member, index) => {
                  return {
                    label: member.name,
                    value: member.userId,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input Description",
                },
              ]}
            >
              <Editor
                apiKey="7vpwdiyzg6b6tg9zbmf64e46rlup0xt9l70dxabwsbbz62fn"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={log}
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                initialValue=""
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
    </div>
  );
}
