import React, { useRef } from "react";
import WithDrawerHOC from "../../HOC/drawerHOC/DrawerHOC";
import { Form, Button, Input, Row, Select, Space, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/constants/DrawerConstants";
import { useEffect } from "react";
import { GET_PROJECT_CATEGORY_SAGA } from "../../redux/constants/ProjectCategoryConstants";
import { useSelector } from "react-redux";
import { EDIT_PROJECT_SAGA } from "../../redux/constants/ProjectConstants";

export default function DrawerFormEditProject() {
  //   hooks
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  const { id, projectName, description, categoryId, creator } = useSelector(
    (state) => state.ProjectReducer.projectInfo
  );
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_SAGA,
    });
  });
  useEffect(() => {
    form.setFieldsValue({
      id,
      projectName,
      categoryId,
    });
  }, [id, projectName, categoryId]);
  // methods
  const handleSubmit = (values) => {
    console.log("values: ", values);
    console.log({
      id: values.id,
      projectName: values.projectName,
      categoryId: values.categoryId,
      description: editorRef.current.getContent(),
    });
    dispatch({
      type: EDIT_PROJECT_SAGA,
      payload: {
        id: values.id,
        projectName: values.projectName,
        categoryId: values.categoryId,
        description: editorRef.current.getContent(),
      },
    });
  };
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const closeDrawer = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <Form
        form={form}
        requiredMark
        layout="vertical"
        scrollToFirstError={true}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id"
              label="Project ID"
              style={{ width: "100%" }}
              initialValue={id}
            >
              <Input disabled readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="projectName"
              label="Project Name"
              rules={[
                {
                  required: true,
                  message: "Please input Project Name",
                },
              ]}
              initialValue={projectName}
            >
              <Input />
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
              initialValue={description}
            >
              <Editor
                apiKey="7vpwdiyzg6b6tg9zbmf64e46rlup0xt9l70dxabwsbbz62fn"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={log}
                initialValue={description}
                value={description}
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
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={categoryId}
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
                placeholder="Select Category Name"
                options={arrProjectCategory?.map((category, index) => {
                  return {
                    label: category.projectCategoryName,
                    value: category.id,
                  };
                })}
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

// WithDrawerHOC(DrawerFormEditProject);
