import { CLOSE_CANVAS, OPEN_CANVAS } from "../constants/OffCanvasConstants";

const initialState = {
  isCanvasOpen: false,
};

export const OffCanvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CANVAS: {
      return {
        ...state,
        isCanvasOpen: true,
      };
    }
    case CLOSE_CANVAS: {
      return {
        ...state,
        isCanvasOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
