module.exports.random = (len) => {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const result = "";
  for (const i = 0; i < len; i++) {
    result += Math.floor(Math.random * char.length);
  }
  return result;
};
