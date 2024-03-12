import { useMemo } from "react";
import { TablePlus } from "../components/TablePlus";
import { ScheduleType, Weekday } from "../interfaces";
import { useGetSchedulesQuery } from "../store/schedule/schedule.api";
import moment from "moment";

const getDiffInHours = (startTime: string, endTime: string) => {
  const start = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");
  let duration = moment.duration(end.diff(start)).asHours();

  if (duration < 0) {
    duration = 24 - Math.abs(duration);
  }
  return duration;
};

// SLEEP DURATION 8 HOURS AT LEAST
const getSleepHours = () => {
  const sleepSchedule = {
    startTime: "21:00",
    endTime: "05:00",
  };

  return getDiffInHours(sleepSchedule.startTime, sleepSchedule.endTime);
};

export const Routine = () => {
  const { data, isLoading } = useGetSchedulesQuery({});

  const jobSchedule = useMemo(() => {
    if (data) return data?.filter((d) => d.type === ScheduleType.JOB);
    return [];
  }, [data]);

  const courseSchedule = useMemo(() => {
    if (data) return data?.filter((d) => d.type === ScheduleType.COURSE);
    return [];
  }, [data]);

  const dayWiseHourConsume = () => {
    const days: any = {};
    Object.keys(Weekday).map((day) => {
      days[day] = getSleepHours();
      const job = jobSchedule.find((d) => d.day.trim() === day);
      console.log(job);
      if (job) {
        days[day] = days[day] + getDiffInHours(job.courses[0].startTime, job.courses[0].endTime);
      }
      return days;
    });
    return days;
  };

  const dayOfWeek = useMemo(() => {
    const consume = dayWiseHourConsume();
    return consume;
  }, [courseSchedule, jobSchedule]);

  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl mb-4 font-semibold">Routine PLanner</h1>
        <div className="flex gap-2"></div>
      </div>

      <TablePlus
        data={Object.keys(dayOfWeek).map((d) => ({ day: d, consume: dayOfWeek[d], remaining: 24 - dayOfWeek[d] }))}
        headerHidden={true}
        headers={[
          {
            name: "Day",
            value: "day",
            render: (row) => (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <strong>{row.day}</strong>
                  {row.remaining <= 0 ? (
                    <p className="text-red-600">
                      You do not have time. You cannot cover your course until you change your sleep time or job time
                    </p>
                  ) : row.remaining <= 4 ? (
                    <p className="text-orange-600">
                      You do a very short time to cover your course. You can swich your job to get more time
                    </p>
                  ) : (
                    <p className="text-green-600">
                      You have extra {row.remaining} hours remainings. You can cover your course
                    </p>
                  )}
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
