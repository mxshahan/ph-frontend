import toast from "react-hot-toast";

export const toastMessage = (status: "error" | "success", data?: any) => {
  console.log(data)
  if (typeof data === "string") {
    toast[status](data);
  } else if (Array.isArray(data?.messages)) {
    data.messages.map((e: string) => {
      return toast[status](e);
    });
  } else if (Array.isArray(data?.message)) {
    toast[status](data.message.join('\n'))
  } else if (data?.message) {
    toast[status](data.message);
  } else {
    toast[status]("Something went wrong");
  }
};
