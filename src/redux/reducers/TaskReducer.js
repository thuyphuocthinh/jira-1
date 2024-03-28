import {
  ADD_ASSIGNEE,
  CHANGE_COMMON_DETAIL,
  GET_TASK_DETAIL,
  REMOVE_ASSIGNEE,
} from "../constants/TaskConstants";

const initialValue = {
  taskDetail: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 6481,
        avatar: "https://ui-avatars.com/api/?name=Phan Thành ",
        name: "Phan Thành ",
        alias: "phan-vu-cong-thanh",
      },
      {
        id: 5666,
        avatar: "https://ui-avatars.com/api/?name=Nguyễn Thành Nguyên",
        name: "Nguyễn Thành Nguyên",
        alias: "nguyen-thanh-nguyen",
      },
    ],
    lstComment: [],
    taskId: 11694,
    taskName: "Register UI",
    alias: "register-ui",
    description: "<p>Create a Register UI</p>",
    statusId: "1",
    originalEstimate: 10,
    timeTrackingSpent: 5,
    timeTrackingRemaining: 5,
    typeId: 0,
    priorityId: 0,
    projectId: 14852,
  },
};

export const TaskReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return {
        ...state,
        taskDetail: action.payload,
      };
    }
    case CHANGE_COMMON_DETAIL: {
      const { name, value } = action;
      return {
        ...state,
        taskDetail: {
          ...state.taskDetail,
          [name]: value,
        },
      };
    }
    case ADD_ASSIGNEE: {
      return {
        ...state,
        taskDetail: {
          ...state.taskDetail,
          assigness: [...state.taskDetail.assigness, action.payload],
        },
      };
    }
    case REMOVE_ASSIGNEE: {
      console.log("action remove assignee", action.payload);
      return {
        ...state,
        taskDetail: {
          ...state.taskDetail,
          assigness: [...state.taskDetail.assigness].filter(
            (assignee) => assignee.id != action.payload
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};
