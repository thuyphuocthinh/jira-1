import { GET_STATUS } from "../constants/StatusConstants";

const initialValue = {
  arrStatus: [],
};

export const StatusReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_STATUS: {
      return {
        ...state,
        arrStatus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
