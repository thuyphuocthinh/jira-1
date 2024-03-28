import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./reducers/RootReducer";
import createSagaMiddleware from "redux-saga";
import { RootSaga } from "./sagas/RootSaga";
import { DrawerReducer } from "./reducers/DrawerReducer";
import { CLOSE_DRAWER, OPEN_DRAWER } from "./constants/DrawerConstants";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [OPEN_DRAWER, CLOSE_DRAWER],
        ignoredPaths: ["DrawerReducer.Component"]
      },
    }).concat(saga);
  },
});

saga.run(RootSaga);
