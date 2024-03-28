import React, { useEffect, useRef } from "react";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import { Form, Input, Select, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { GET_PROJECT_CATEGORY_SAGA } from "../../redux/constants/ProjectCategoryConstants";
import { useSelector } from "react-redux";
import { CREATE_NEW_PROJECT_SAGA } from "../../redux/constants/ProjectConstants";

function CreateProject() {
  const dispatch = useDispatch();
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_SAGA,
    });
  }, []);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };
  const handleSubmit = (values) => {
    dispatch({
      type: CREATE_NEW_PROJECT_SAGA,
      payload: {
        projectName: values.projectName,
        description: values.description?.level.content,
        categoryId: values.categoryId,
      },
    });
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center mx-auto"
      style={{ maxWidth: "700px", width: "100%", height: "100vh" }}
    >
      <div>
        <h4 className="text-center">Create Project</h4>
        <div className="d-flex align-items-center justify-content-center">
          <Form onFinish={handleSubmit} requiredMark layout="vertical">
            <Form.Item
              name="projectName"
              label="Project Name"
              rules={[
                {
                  required: true,
                  message: "Please input Project Name!",
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input placeholder="Project Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description",
                },
              ]}
            >
              <Editor
                apiKey="7vpwdiyzg6b6tg9zbmf64e46rlup0xt9l70dxabwsbbz62fn"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={log}
                initialValue="<p></p>"
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
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
              style={{ width: "100%" }}
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
            <Form.Item>
              <Button htmlType="submit" type="primary" className="w-100">
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default WithHomeTemplate(CreateProject);
