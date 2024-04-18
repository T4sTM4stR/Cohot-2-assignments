/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let sortedStr1 = str1.toUpperCase();
  let sortedStr2 = str2.toUpperCase();

  sortedStr1 = sortedStr1.split("").sort().join();
  sortedStr2 = sortedStr2.split("").sort().join();

  if (str1.length != str2.length) {
    return false;
  }
  for (let i = 0; i < sortedStr1.length; i++) {
    if (sortedStr1.charAt(i) != sortedStr2.charAt(i)) return false;
  }
  return true;
}

module.exports = isAnagram;
