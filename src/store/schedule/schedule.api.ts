import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateScheduleDto, ScheduleType } from "../../interfaces";
import { Schedule } from "../../interfaces/schedule.interface";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/schedule",
  }),
  endpoints: (build) => ({
    createSchedule: build.mutation<Schedule, CreateScheduleDto>({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
    }),

    getSchedules: build.query<Schedule[], { type?: ScheduleType }>({
      query: (params) => ({
        url: "/",
        method: "GET",
        params: params,
      }),
    }),

    deleteSchedule: build.mutation<Schedule, string>({
      query: (id) => ({
        url: "/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateScheduleMutation, useGetSchedulesQuery, useDeleteScheduleMutation } = scheduleApi;
