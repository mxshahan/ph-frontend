import { useMemo } from "react";
import { TablePlus } from "../components/TablePlus";
import { Schedule, ScheduleType } from "../interfaces";
import { useGetSchedulesQuery } from "../store/schedule/schedule.api";

interface IProps {}

export const Routine = (props: IProps) => {
  const { data, isLoading, refetch } = useGetSchedulesQuery({});

  const jobSchedule = useMemo(() => {
    if (data) return data?.filter((d) => d.type === ScheduleType.JOB);
    return [];
  }, [data]);

  const courseSchedule = useMemo(() => {
    if (data) return data?.filter((d) => d.type === ScheduleType.COURSE);
    return [];
  }, [data]);

  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl mb-4 font-semibold">Routine PLanner</h1>
        <div className="flex gap-2"></div>
      </div>

      <TablePlus
        data={Array.isArray(data) ? data : []}
        headerHidden={true}
        headers={[
          {
            name: "Day",
            value: "day",
            render: (row: Schedule) => (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <strong>{row.day}</strong>
                  <div className="grid grid-cols-4">
                    {row.courses.map((course) => (
                      <div className="border border-cyan-500 p-2 w-full">
                        <p>Title: {course.title}</p>
                        <p>Start Time: {course.startTime}</p>
                        <p>End Time: {course.endTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        loading={isLoading}
      />
    </div>
  );
};
