export const toPersianDate = (date) => {
  const d = new Date(date).toLocaleDateString('fa-IR');
  return d;
};
