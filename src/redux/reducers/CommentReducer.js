import { GET_ALL_COMMENT } from "../constants/CommentConstants";

const initialState = {
  arrComments: [],
};

export const CommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_COMMENT:
      return { ...state, arrComments: payload };

    default:
      return state;
  }
};
