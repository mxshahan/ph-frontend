/* eslint-disable no-unused-vars */
export enum Weekday {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum ScheduleType {
  COURSE = "COURSE",
  JOB = "JOB",
}

/* eslint-enable no-unused-vars */

export interface ActionType {
  type: string;
  payload?: any;
}

export interface RequestError {
  data: {
    error: any;
    message: string;
    statusCode: number;
  };
  status: number;
}

export interface DefaultResponse {
  success: boolean;
  message: string;
}

export interface TableHeaderType {
  name: any;
  value: string;
  default?: string;
  width?: string | number;
  className?: string | undefined;
  sort?: boolean;
  disableRowClick?: boolean;
  // eslint-disable-next-line no-unused-vars
  render?: (e: any, index: number) => any;
}
