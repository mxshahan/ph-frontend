import { Weekday } from "./default.interface";

export interface Schedule {
  _id: string;
  type: string;
  day: Weekday;
  courses: Course[];
}

export interface Course {
  title: string;
  startTime: string;
  endTime: string;
}
