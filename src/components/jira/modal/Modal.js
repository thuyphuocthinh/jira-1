import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GET_TASK_TYPE_SAGA } from "../../../redux/constants/TaskTypeConstants";
import parse from "html-react-parser";
import { GET_STATUS_SAGA } from "../../../redux/constants/StatusConstants";
import { GET_PRIORITY_SAGA } from "../../../redux/constants/PriorityConstants";
import { AutoComplete, Button, Popconfirm, Popover, Modal, Select } from "antd";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  ADD_ASSIGNEE,
  CHANGE_COMMON_DETAIL,
  DELETE_TASK_SAGA,
  REMOVE_ASSIGNEE,
  UPDATE_TASK_SAGA,
} from "../../../redux/constants/TaskConstants";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../../redux/constants/CommentConstants";
import BSModal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { CLOSE_MODAL } from "../../../redux/constants/ModalConstants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotifyFunction } from "../../../utils/notification/NotifyFunction";

export default function ModalJira() {
  // hooks
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.TaskReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { arrComments } = useSelector((state) => state.CommentReducer);
  const [visibleDescEditor, setVisibleDescEditor] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [contentComment, setContentComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(0);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [visibleTaskNameEdit, setVisibleTaskNameEdit] = useState(false);
  const [taskNameEditContent, setTaskNameEditContent] = useState("");
  const { isModalOpen } = useSelector((state) => state.ModalReducer);
  const debounceRef = useRef(null);
  const editorRef = useRef(null);
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  useEffect(() => {
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_STATUS_SAGA,
    });
    dispatch({
      type: GET_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_COMMENT_SAGA,
    });
  }, []);
  // methods
  const onCopyText = () => {
    setTextToCopy(`http://localhost:3000/project/${taskDetail.projectId}`);
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 2000); // Reset status after 2 seconds
  };
  const log = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.getContent());
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (debounceRef.current) {
      clearTimeout();
    }
    debounceRef.current = setTimeout(() => {
      dispatch({
        type: UPDATE_TASK_SAGA,
        reducerType: CHANGE_COMMON_DETAIL,
        name,
        value,
      });
    }, 100);
  };
  const renderTimeTracking = () => {
    const { timeTrackingRemaining, timeTrackingSpent } = taskDetail;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div className="flex-grow-1">
        <div className="progress" style={{ height: 10 }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Example with label"
            style={{ width: `${percent}%` }}
            aria-valuenow={Number(timeTrackingSpent)}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="timeTracking-input">
            <p className="p-0 m-0">{taskDetail?.timeTrackingSpent}h spent</p>
            <input
              type="number"
              className="form-control"
              name="timeTrackingSpent"
              min={0}
              value={taskDetail?.timeTrackingSpent}
              onChange={handleChange}
            />
          </div>
          <div className="timeTracking-input">
            <p className="p-0 m-0">
              {taskDetail?.timeTrackingRemaining}h estimated
            </p>
            <input
              onChange={handleChange}
              type="number"
              name="timeTrackingRemaining"
              className="form-control"
              min={0}
              value={taskDetail?.timeTrackingRemaining}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      centered
      open={isModalOpen}
      onOk={() => dispatch({ type: CLOSE_MODAL })}
      onCancel={() => dispatch({ type: CLOSE_MODAL })}
      width={1100}
    >
      {/* <div className="modal-dialog"> */}
      <div className="modal-content">
        <div className="container p-3">
          <div className="row mb-4">
            <div className="taskDetail-header d-flex justify-content-between">
              <div className="taskDetail-type">
                <div className="form-group">
                  <select
                    className="form-control"
                    style={{ width: 150 }}
                    name="typeId"
                    onChange={handleChange}
                  >
                    {arrTaskType.map((taskType, index) => {
                      if (taskType?.id === taskDetail?.typeId) {
                        return (
                          <option selected key={index} value={taskType?.id}>
                            {(taskType?.taskType).toUpperCase()}
                          </option>
                        );
                      }
                      return (
                        <option key={index} value={taskType?.id}>
                          {(taskType?.taskType).toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="taskDetail-buttons">
                <button className="d-md-block d-none btn btn-light">
                  <i className="fa-solid fa-paper-plane me-2" />
                  Give feedback
                </button>

                <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                  <button
                    className="d-md-block d-none btn btn-light"
                    onClick={() => {
                      onCopyText();
                    }}
                  >
                    <i className="fa-solid fa-copy me-2" />
                    {copyStatus ? <span>Copied</span> : <span>Copy link</span>}
                  </button>
                </CopyToClipboard>
                <Popconfirm
                  title="Delete task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_TASK_SAGA,
                      payload: taskDetail?.taskId,
                      projectId: taskDetail?.projectId,
                    });
                    dispatch({
                      type: CLOSE_MODAL,
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="btn btn-light">
                    <i className="fa-solid fa-trash" />
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="taskDetail-main">
                <div className="taskDetail-content">
                  {visibleTaskNameEdit ? (
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        name="taskName"
                        rows="2"
                        defaultValue={taskDetail?.taskName}
                        onChange={(e) => {
                          const { value } = e.target;
                          console.log(value);
                          setTaskNameEditContent(value);
                        }}
                      ></textarea>
                    </div>
                  ) : (
                    <h4 onClick={() => setVisibleTaskNameEdit(true)}>
                      {taskDetail?.taskName}
                    </h4>
                  )}
                  {visibleTaskNameEdit ? (
                    <div className="mt-2">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          dispatch({
                            type: UPDATE_TASK_SAGA,
                            reducerType: CHANGE_COMMON_DETAIL,
                            name: "taskName",
                            value: taskNameEditContent,
                          });
                          setVisibleTaskNameEdit(false);
                        }}
                      >
                        {" "}
                        Save{" "}
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={() => setVisibleTaskNameEdit(false)}
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="taskDetail-description">
                    <h6>Description</h6>
                    <div onClick={() => setVisibleDescEditor(true)}>
                      {visibleDescEditor ? (
                        <>
                          <Editor
                            apiKey="7vpwdiyzg6b6tg9zbmf64e46rlup0xt9l70dxabwsbbz62fn"
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            onChange={log}
                            // value={taskDetail?.description}
                            initialValue={taskDetail?.description}
                            init={{
                              height: 250,
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
                        </>
                      ) : (
                        <p className="mt-3">
                          {parse(taskDetail?.description || "")}
                        </p>
                      )}
                    </div>
                    {visibleDescEditor && (
                      <div className="mt-2">
                        <Button
                          htmlType="button"
                          type="primary"
                          onClick={() => {
                            dispatch({
                              type: UPDATE_TASK_SAGA,
                              reducerType: CHANGE_COMMON_DETAIL,
                              name: "description",
                              value: editorContent,
                            });
                            setVisibleDescEditor(false);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          htmlType="button"
                          type="default"
                          className="ms-1"
                          onClick={() => setVisibleDescEditor(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="taskDetail-comment">
                  <h6>Comments</h6>
                  <div className="taskDetail-commentArea mt-4">
                    <div className="taskDetail-commentAvatar">
                      <img
                        src={require("../../../assets/jiraImage/avatar-default-icon.png")}
                        alt="avatar-default-icon"
                      />
                    </div>
                    <div className="taskDetail-commentInput">
                      <div className="form-floating">
                        <textarea
                          className="form-control w-100"
                          name="contentComment"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          value={contentComment}
                          style={{ height: 70 }}
                          defaultValue={""}
                          onClick={() => setVisibleComment(true)}
                          onChange={(e) => {
                            const { value } = e.target;
                            setContentComment(value);
                          }}
                        />
                        <label htmlFor="floatingTextarea2">Comments</label>
                      </div>
                      {visibleComment && (
                        <div className="mt-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch({
                                type: INSERT_COMMENT_SAGA,
                                payload: {
                                  taskId: taskDetail?.taskId,
                                  contentComment,
                                },
                              });
                              setVisibleComment(false);
                              setContentComment("");
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-light"
                            onClick={() => setVisibleComment(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="taskDetail-commentDetail">
                  <ul>
                    {taskDetail.lstComment?.map((comment, index) => {
                      return (
                        <li key={index} className="w-100 mt-4">
                          <div className="taskDetail-commentAvatar">
                            <img
                              src={comment.avatar}
                              alt="avatar-default-icon"
                            />
                          </div>
                          <div className="taskDetail-commentContent">
                            <p className="m-0 p-0">{comment.name}</p>
                            {comment.id === editCommentId ? (
                              <textarea
                                className="form-control w-100"
                                name="contentComment"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: 70 }}
                                defaultValue={comment.commentContent || ""}
                                onChange={(e) => {
                                  const { value } = e.target;
                                  setEditCommentContent(value);
                                }}
                              />
                            ) : (
                              <p
                                className="m-0 p-0"
                                style={{ fontWeight: "300" }}
                              >
                                {parse(comment.commentContent || "")}
                              </p>
                            )}
                            {comment.id === editCommentId ? (
                              <div className="my-2">
                                <button
                                  className="btn btn-success me-2"
                                  onClick={() => {
                                    dispatch({
                                      type: UPDATE_COMMENT_SAGA,
                                      payload: {
                                        id: comment.id,
                                        contentComment: editCommentContent,
                                      },
                                      taskId: taskDetail?.taskId,
                                    });
                                    setEditCommentId(0);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-light"
                                  onClick={() => setEditCommentId(0)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                            {comment.id === editCommentId ? (
                              ""
                            ) : (
                              <div className="mt-2">
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => {
                                    setEditCommentId(comment.id);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    dispatch({
                                      type: DELETE_COMMENT_SAGA,
                                      payload: comment.id,
                                      taskId: taskDetail?.taskId,
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="taskDetail-sideBar">
                <div className="taskDetail-status mb-4">
                  <h6>STATUS</h6>
                  <div className="form-group">
                    <select
                      className="form-control w-100"
                      name="statusId"
                      onChange={handleChange}
                    >
                      {arrStatus?.map((status, index) => {
                        if (status.statusId == taskDetail?.statusId) {
                          return (
                            <option
                              key={index}
                              value={status.statusId}
                              selected
                            >
                              {status.statusName}
                            </option>
                          );
                        }
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="taskDetail-assignees mb-4">
                  <h6>ASSIGNEES</h6>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    {taskDetail.assigness?.map((assignee, index) => {
                      return (
                        <div className="taskDetail-assignee" key={index}>
                          <img
                            src={assignee.avatar}
                            alt="avatar-default-icon"
                            style={{
                              borderRadius: "50%",
                              border: "1px solid black",
                            }}
                          />
                          <p className="p-0 m-0 px-2">{assignee.name}</p>
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => {
                              dispatch({
                                type: UPDATE_TASK_SAGA,
                                reducerType: REMOVE_ASSIGNEE,
                                payload: assignee.id,
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                    <Popover
                      content={() => {
                        return (
                          <Select
                            allowClear
                            autoClearSearchValue
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            placeholder="Select Category Name"
                            options={projectDetail?.members
                              ?.filter((member) => {
                                let index = taskDetail.assigness?.findIndex(
                                  (assignee) => assignee?.id === member.userId
                                );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((member, index) => {
                                return {
                                  label: member.name,
                                  value: member.userId,
                                };
                              })}
                            onSelect={(value) => {
                              let userSelect = projectDetail.members?.find(
                                (member) => member.userId == value
                              );
                              console.log("userSelect: ", userSelect);
                              if (userSelect) {
                                userSelect = {
                                  ...userSelect,
                                  id: userSelect.userId,
                                };
                                dispatch({
                                  type: UPDATE_TASK_SAGA,
                                  reducerType: ADD_ASSIGNEE,
                                  payload: userSelect,
                                });
                              }
                            }}
                          />
                        );
                      }}
                      trigger="click"
                      placement="bottom"
                      zIndex={2000}
                    >
                      <Button htmlType="button">+ Add more</Button>
                    </Popover>
                  </div>
                </div>
                <div className="taskDetail-priority mb-4">
                  <h6>PRIORITY</h6>
                  <div className="form-group">
                    <select
                      className="form-control w-100"
                      name="priorityId"
                      onChange={handleChange}
                    >
                      {arrPriority?.map((priority, index) => {
                        if (priority.priorityId == taskDetail?.priorityId) {
                          return (
                            <option
                              value={priority.priorityId}
                              selected
                              key={index}
                            >
                              {priority.priority}
                            </option>
                          );
                        }
                        return (
                          <option value={priority.priorityId} key={index}>
                            {priority.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="taskDetail-originalEstimate mb-4">
                  <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                  <div className="form-group">
                    <input
                      type="number"
                      min={0}
                      name="originalEstimate"
                      className="form-control"
                      placeholder
                      aria-describedby="helpId"
                      onChange={handleChange}
                      value={taskDetail?.originalEstimate}
                    />
                  </div>
                </div>
                <div className="taskDetail-timeTracking mb-4">
                  <h6>TIME TRACKING</h6>
                  <div className="d-flex gap-2">
                    <span>
                      <i className="fa-solid fa-clock" />
                    </span>
                    {renderTimeTracking()}
                  </div>
                </div>
                <hr />
                <div className="taskDetail-updated">
                  <p>Created a month ago</p>
                  <p>Updated at 4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Modal>
  );
}
