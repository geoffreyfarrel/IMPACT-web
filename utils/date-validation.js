const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Matches yyyy-mm-dd
  return regex.test(date);
};

module.exports = isValidDate;
