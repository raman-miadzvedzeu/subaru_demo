export const formatDate = (date: Date) => {
  const { year, month, day } = parseDate(date);
  return `${year}-${month}-${day}`;
};
export const formatUsDate = (date: Date) => {
  const { year, month, day } = parseDate(date);
  return `${month}/${day}/${year}`;
};

const parseDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return {
    day,
    month,
    year,
  };
};
