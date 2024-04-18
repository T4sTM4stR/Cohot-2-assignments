/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const regex = /[a-zA-Z]/gi;
  if (str.length === 1 || !/^[a-zA-Z]+$/.test(str)) return true;
  str = str.toUpperCase();
  let alpha = str.match(regex);
  if (!alpha) return false;

  const normalizedStr = alpha.join("").toUpperCase();
  const reversedStr = normalizedStr.split("").reverse().join("");

  return normalizedStr === reversedStr;
}

module.exports = isPalindrome;
