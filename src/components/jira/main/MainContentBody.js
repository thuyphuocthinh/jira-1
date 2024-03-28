import { Avatar, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/constants/TaskConstants";
import { OPEN_MODAL } from "../../../redux/constants/ModalConstants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function MainContentBody(props) {
  const { lstTask } = props.projectDetail;
  console.log("lstTask", lstTask);
  const dispatch = useDispatch();
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    console.log("destination: ", destination);
    console.log("source: ", source);
    const { projectId, taskId } = JSON.parse(result.draggableId);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      payload: {
        taskId,
        projectId,
        statusId: destination.droppableId,
      },
    });
  };
  const renderTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {lstTask?.map((lstTaskByStatus, index) => {
          return (
            <Droppable
              index={index}
              key={lstTaskByStatus.statusId}
              droppableId={lstTaskByStatus.statusId}
            >
              {(provided) => {
                return (
                  <div
                    key={index}
                    className="mb-3 col-12 col-sm-6 mb-lg-0 col-lg-3"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="mainContent-col">
                      <div className="mainContent-status">
                        <p>
                          {lstTaskByStatus.statusName}
                          <span className="ms-2">
                            {lstTaskByStatus.lstTaskDeTail.length}
                          </span>
                        </p>
                      </div>
                      <ul className="taskList">
                        {lstTaskByStatus.lstTaskDeTail?.map(
                          (taskByStatus, index) => {
                            return (
                              <Draggable
                                index={index}
                                key={taskByStatus.taskId}
                                draggableId={JSON.stringify({
                                  projectId: taskByStatus.projectId,
                                  taskId: taskByStatus.taskId,
                                })}
                              >
                                {(provided) => {
                                  return (
                                    <li
                                      key={index}
                                      className="task"
                                      onClick={() => {
                                        dispatch({
                                          type: OPEN_MODAL,
                                        });
                                        dispatch({
                                          type: GET_TASK_DETAIL_SAGA,
                                          payload: taskByStatus.taskId,
                                        });
                                      }}
                                      style={{ cursor: "pointer" }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="task-title">
                                        <p>{taskByStatus.taskName}</p>
                                      </div>
                                      <div className="task-status">
                                        <div className="task-statusIcon">
                                          <i className="fa-solid fa-check" />
                                          <i className="fa-solid fa-arrow-down" />
                                        </div>
                                        <div className="d-flex task-avatars gap-1 flex-wrap">
                                          {taskByStatus.assigness?.length >= 3
                                            ? taskByStatus.assigness
                                                ?.slice(0, 3)
                                                .map((assignee, index) => {
                                                  return (
                                                    <div className="task-avatar">
                                                      <img
                                                        src={assignee.avatar}
                                                        alt={assignee.avatar}
                                                        key={index}
                                                      />
                                                    </div>
                                                  );
                                                })
                                            : taskByStatus.assigness?.map(
                                                (assignee, index) => {
                                                  return (
                                                    <div className="task-avatar">
                                                      <img
                                                        src={assignee.avatar}
                                                        alt={assignee.avatar}
                                                        key={index}
                                                      />
                                                    </div>
                                                  );
                                                }
                                              )}
                                          {taskByStatus.assigness?.length >
                                            3 && (
                                            <div className="task-avatar">
                                              <Avatar>...</Avatar>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  );
                                }}
                              </Draggable>
                            );
                          }
                        )}
                      </ul>
                    </div>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return (
    <div className="mainContent-body">
      <div className="row">{renderTaskList()}</div>
    </div>
  );
}
