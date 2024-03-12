import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Routine } from "../../interfaces/routine.interface";

export const routineApi = createApi({
  reducerPath: "routineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/routine",
  }),
  endpoints: (build) => ({
    getRoutine: build.query<Routine, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRoutineQuery } = routineApi;
