import { ChangeEvent, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/ConfirmModal";
import formStyle from "../styles/form.module.scss";
import { ScheduleType, Weekday, Course } from "../interfaces";
import { TablePlus } from "../components/TablePlus";
import { toUpperFirstLetter } from "../util/mixin";
import {
  useGetSchedulesQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} from "../store/schedule/schedule.api";
import { Schedule } from "../interfaces/schedule.interface";
import { toastMessage } from "../util/toastError";

/**
 * Student Will Have Class Time
 * Student Will Have Job Time
 *
 * He can fill his class time. i.e
 * Week Day   Type    Course    Start Time    End Time
 * Monday     Class   Course A  01:30 PM      02:30 PM
 *            Class   Course B  03:30 PM      04:00 PM
 *
 * In Monday he has 1 hours gap within two course
 *
 *
 */

interface IProps {
  type: ScheduleType;
}

const DynamicModule = ({ type }: IProps) => {
  const [day, setDay] = useState(Weekday.MONDAY);

  const intialState = [
    {
      title: "",
      startTime: "",
      endTime: "",
    },
  ];
  const [courses, setCourses] = useState(intialState);

  const [deleteSchedule] = useDeleteScheduleMutation();
  const [createSchedule] = useCreateScheduleMutation();

  const { data, isLoading, refetch } = useGetSchedulesQuery({ type });

  const onChange = (value: Partial<Course>, index: number) => {
    courses[index] = { ...courses[index], ...value };
    setCourses([...courses]);
  };

  const onConfirm = () => {
    return createSchedule({
      day,
      type,
      courses,
    })
      .unwrap()
      .then(() => {
        refetch();
        toastMessage("success", "Successfully created!");
        setCourses(intialState);
      })
      .catch((err) => {
        toastMessage("error", err.data);
        return Promise.reject(err.data);
      });
  };

  const handleDelete = (id: string) => {
    deleteSchedule(id)
      .unwrap()
      .then(() => {
        refetch();
        toastMessage("success", "Successfully deleted");
      })
      .catch((err) => {
        toastMessage("error", err.data);
        return Promise.reject(err.data);
      });
  };

  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl mb-4 font-semibold">{toUpperFirstLetter(type)} Schedules</h1>
        <div className="flex gap-2">
          <ConfirmModal
            title={toUpperFirstLetter(type) + " Schedule"}
            description={
              <div>
                <div className={formStyle.formField}>
                  <label className={formStyle.formLabel}>Day</label>
                  <select
                    className={formStyle.formInput}
                    name="day"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDay(e.target.value as Weekday)}
                    value={day}
                  >
                    {Object.values(Weekday).map((day) => (
                      <option value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                {courses.map((course, index) => (
                  <div className="flex flex-row">
                    <div className={formStyle.formField}>
                      <label className={formStyle.formLabel}>{toUpperFirstLetter(type)} Title</label>
                      <input
                        type="text"
                        placeholder="Title"
                        className={formStyle.formInput}
                        name="title"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }, index)}
                        value={course.title}
                      />
                    </div>

                    <div className={formStyle.formField}>
                      <label className={formStyle.formLabel}>Start Time</label>
                      <input
                        type="time"
                        className={formStyle.formInput}
                        name="startTime"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ startTime: e.target.value }, index)}
                        value={course.startTime}
                      />
                    </div>
                    <div className={formStyle.formField}>
                      <label className={formStyle.formLabel}>End Time</label>
                      <input
                        type="time"
                        className={formStyle.formInput}
                        name="endTime"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ endTime: e.target.value }, index)}
                        value={course.endTime}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="border"
                  onClick={() => {
                    setCourses([
                      ...courses,
                      {
                        title: "",
                        startTime: "",
                        endTime: "",
                      },
                    ]);
                  }}
                >
                  Add More
                </Button>
              </div>
            }
            onConfirm={onConfirm}
          >
            <Button className="border border-cyan-500 text-cyan-500 hover:text-white hover:bg-cyan-500 ">
              Create {toUpperFirstLetter(type)} Schedule
            </Button>
          </ConfirmModal>
        </div>
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
                <div>
                  <ConfirmModal onConfirm={() => handleDelete(row._id)}>
                    <Button className="border border-red-500 text-red-500 hover:bg-red-500">Delete</Button>
                  </ConfirmModal>
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

export const Profile = () => {
  return (
    <div>
      <DynamicModule type={ScheduleType.COURSE} />
      <DynamicModule type={ScheduleType.JOB} />
    </div>
  );
};
