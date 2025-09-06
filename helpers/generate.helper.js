module.exports.random = (len) => {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += char[Math.floor(Math.random() * char.length)]
  }
  return result;
};
