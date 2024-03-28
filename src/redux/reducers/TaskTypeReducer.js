import { GET_TASK_TYPE } from "../constants/TaskTypeConstants";

const initialValue = {
  arrTaskType: [],
};

export const TaskTypeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_TASK_TYPE: {
      return {
        ...state,
        arrTaskType: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
