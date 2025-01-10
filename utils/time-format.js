const convertToTaiwanTime = (date) => {
  const taiwanOffset = 8 * 60; // UTC+8 in minutes
  const localDate = new Date(date);
  return new Date(localDate.getTime() + taiwanOffset * 60 * 1000);
};
const convertToUTCTime = (date) => {
  const taiwanOffset = 8 * 60; // UTC+8 in minutes
  const localDate = new Date(date);
  return new Date(localDate.getTime() - taiwanOffset * 60 * 1000);
};

module.exports = { convertToTaiwanTime, convertToUTCTime };
