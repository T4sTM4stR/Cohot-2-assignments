const fs = require("fs");
const path = "./file.txt";

const space = () => {
  let text = fs.readFileSync(path, "utf-8");
  console.log("Original text:");
  console.log(text);

  let f = false;
  let textAfter = "";

  for (let i = 0; i < text.length; i++) {
    let c = text.charAt(i);

    if (c === " " && f === false) {
      f = true;
      textAfter += c;
    } else if (c !== " ") {
      textAfter += c;
      f = false;
    }
  }
  fs.writeFileSync(path, textAfter);

  // Reading the file again to see the changes
  let newText = fs.readFileSync(path, "utf-8");
  console.log("Text after removing extra spaces:");
  console.log(newText);
};

space();
