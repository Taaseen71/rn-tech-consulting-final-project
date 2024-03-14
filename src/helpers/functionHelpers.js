export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString(); // Format date
  const formattedTime = date.toLocaleTimeString(); // Format time
  return `${formattedDate} \t\t${formattedTime}`; // Concatenate date and time
};
