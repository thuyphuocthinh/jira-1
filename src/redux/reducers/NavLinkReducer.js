import { GET_PROJECT_LINK_ID } from "../constants/NavLinkConstants";

const initialValue = {
  id: ":id",
};

export const NavLinkReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_PROJECT_LINK_ID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
