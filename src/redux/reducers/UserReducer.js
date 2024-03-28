import {
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_BY_KEYWORD,
  GET_USER_BY_PROJECT_ID,
  GET_USER_INFO,
  GET_USER_SEARCH,
  VERIFY_TOKEN,
} from "../constants/UserConstants";

const initialState = {
  arrUsers: [],
  userInfo: {},
  arrUsersByKeyword: [],
  arrUsersByProjectId: [],
  isVerified: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER: {
      return {
        ...state,
        arrUsers: action.payload,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case GET_USER_BY_KEYWORD: {
      return {
        ...state,
        arrUsersByKeyword: action.payload,
      };
    }
    case GET_USER_BY_PROJECT_ID: {
      return {
        ...state,
        arrUsersByProjectId: action.payload,
      };
    }
    case VERIFY_TOKEN: {
      return {
        ...state,
        isVerified: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
