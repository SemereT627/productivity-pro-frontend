import { notification } from "antd";

type Placement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export const globalNotification = (
  type: string,
  text: string,
  placement = "topRight" as Placement,
  duration = 2
) => {
  switch (type.toLowerCase()) {
    case "success":
      return notification.success({
        message: "Success",
        description: text,
        placement,
        duration,
      });

    case "error":
      return notification.error({
        message: "Error",
        description: text,
        placement,
        duration,
      });

    case "warning":
      return notification.warning({
        message: "Warning",
        description: text,
        placement,
        duration,
      });

    default:
      return notification.info({
        message: "Info",
        duration,
        placement,
        description: text,
      });
  }
};
