import { Priority } from "../api";

export const getPriorityName = (priority: Priority) => {
  switch (priority) {
    case Priority.Error:
      return "Error";
    case Priority.Warn:
      return "Warning";
    case Priority.Info:
      return "Info";
    default:
      return "Unknown";
  }
};
