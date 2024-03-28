import { GET_PRIORITY } from "../constants/PriorityConstants";

const initialValue = {
  arrPriority: [],
};

export const PriorityReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_PRIORITY: {
      return {
        ...state,
        arrPriority: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
