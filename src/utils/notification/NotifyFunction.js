import { notification } from "antd";

export const NotifyFunction = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
