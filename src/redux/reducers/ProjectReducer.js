import {
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  GET_SINGLE_PROJECT_INFO,
} from "../constants/ProjectConstants";

const initialState = {
  arrProjects: [],
  projectInfo: {},
  projectDetail: {},
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      return {
        ...state,
        arrProjects: action.payload,
      };
    }
    case GET_SINGLE_PROJECT_INFO: {
      return {
        ...state,
        projectInfo: action.payload,
      };
    }
    case GET_PROJECT_DETAIL: {
      return {
        ...state,
        projectDetail: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
