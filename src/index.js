module.exports = function check(str, bracketsConfig) {
  const openingBrackets = bracketsConfig.map((config) => config[0]);
  const closingBrackets = bracketsConfig.map((config) => config[1]);
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isOpening = openingBrackets.includes(char);
    const isClosing = closingBrackets.includes(char);
    if (isOpening && isClosing) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (isOpening) {
      stack.push(char);
    } else if (isClosing) {
      const configIndex = closingBrackets.indexOf(char);
      const expectedOpening = openingBrackets[configIndex];
      if (stack.length === 0 || stack.pop() !== expectedOpening) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
