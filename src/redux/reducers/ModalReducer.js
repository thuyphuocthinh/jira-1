import { CLOSE_MODAL, OPEN_MODAL } from "../constants/ModalConstants";

const initialState = {
  isModalOpen: false,
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
