import { CLOSE_DRAWER, OPEN_DRAWER } from "../constants/DrawerConstants";

const initialState = {
  isDrawerOpen: false,
  Component: <></>,
  title: "",
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        ...state,
        isDrawerOpen: true,
        Component: action.Component,
        title: action.title,
      };
    }
    case CLOSE_DRAWER: {
      return {
        ...state,
        isDrawerOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
