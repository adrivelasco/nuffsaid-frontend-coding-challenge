import { Priority } from "../api";

export type Entry = {
  id: string;
  message: string;
  priority: Priority;
};

export type Group<T> = {
  name: string;
  entries: T[];
};
