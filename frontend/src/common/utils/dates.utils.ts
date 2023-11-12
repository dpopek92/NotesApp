import dayjs from "dayjs";

export const formatDate = (date: Date) =>
  dayjs(date).format("DD.MM.YYYY, HH:mm");
