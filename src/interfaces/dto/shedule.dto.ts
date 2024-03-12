import { Weekday } from "../default.interface";
import { Course } from "../schedule.interface";

export interface CreateScheduleDto {
  type: string;
  day: Weekday;
  courses: Course[];
}
