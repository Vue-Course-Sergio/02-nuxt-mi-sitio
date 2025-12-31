export const dayMonthYearFormat = (date: Date) => {
  return new Date(date).toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
