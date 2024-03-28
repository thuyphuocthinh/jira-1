import { combineReducers } from "redux";
import { LoadingReducer } from "./LoadingReducer";
import { UserReducer } from "./UserReducer";
import { ProjectReducer } from "./ProjectReducer";
import { DrawerReducer } from "./DrawerReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { TaskTypeReducer } from "./TaskTypeReducer";
import { StatusReducer } from "./StatusReducer";
import { PriorityReducer } from "./PriorityReducer";
import { TaskReducer } from "./TaskReducer";
import { NavLinkReducer } from "./NavLinkReducer";
import { CommentReducer } from "./CommentReducer";
import { ModalReducer } from "./ModalReducer";
import { OffCanvasReducer } from "./OffCanvasReducer";

export const RootReducer = combineReducers({
  // reducers
  LoadingReducer,
  UserReducer,
  ProjectReducer,
  DrawerReducer,
  ProjectCategoryReducer,
  TaskTypeReducer,
  StatusReducer,
  PriorityReducer,
  TaskReducer,
  NavLinkReducer,
  CommentReducer,
  ModalReducer,
  OffCanvasReducer,
});
