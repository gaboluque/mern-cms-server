export default (data, message) => {
  const result = { success: true };
  if (message) {
    result.info = { message, type: 'success' };
  }
  if (data) {
    result.data = data;
  }
  return result;
};
