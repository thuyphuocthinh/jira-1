import { GET_PROJECT_CATEGORY } from "../constants/ProjectCategoryConstants";

const initialValue = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_PROJECT_CATEGORY: {
      return {
        ...state,
        arrProjectCategory: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
