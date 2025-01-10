function formatISOTimeWithDate(isoTimeString) {
  // Format to show both date and time (e.g., "YYYY-MM-DD hh:mm")
  const date = new Date(isoTimeString);
  return date.toISOString().slice(0, 16).replace("T", " ");
}
