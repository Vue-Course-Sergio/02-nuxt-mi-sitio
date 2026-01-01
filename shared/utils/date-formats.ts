export const dayMonthYearFormat = (date: Date) => {
  return new Date(date).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const longDateTimeFormat = (date: Date) => {
  return new Date(date).toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    hour12: true,
  });
};
