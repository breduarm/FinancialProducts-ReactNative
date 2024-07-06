export const formatDate = (date: Date) => {
  const dateAppointment = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return dateAppointment.toLocaleDateString('en-US', options);
};
