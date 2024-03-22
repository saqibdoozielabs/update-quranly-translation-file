const fs = require("fs");

const language = "File_NAME_HERE";

fs.readFile(`${language}.txt`, "utf8", (err, queryTextFileData) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const dataArray = queryTextFileData.split("\n");
  console.log("TOTAL LINES IN ", `${language}.txt >>>`, dataArray.length);

  fs.readFile(`${language}.json`, "utf8", (err, updatedFileData) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const jsonData = JSON.parse(updatedFileData);
    // updatedFileData type is string and jsonData type is object

    const translations = jsonData["translations"];

    let newDataArray = [];

    for (let i = 0; i < translations.length; i++) {
      let getText = translations[i]["text"];

      // Remove <sup> tag and its contents
      getText = getText.replace(/<sup[^>]*>.*?<\/sup>/gi, "");

      getText = getText.replace(/'/g, '"');

      newDataArray.push(getText);
    }

    console.log("NUMBER OF TRANSLATIONS TO UPDATE >>>", newDataArray.length);

    let lineIndex = 0;

    let regex = /INSERT\s+INTO\s+(?:`|'|")TRANSLATION(?:`|'|")/i;

    for (let j = 0; j < dataArray.length; j++) {
      if (!(regex.test(dataArray[j]) || dataArray[j].length == 0)) {
        let stringData = dataArray[j];
        // console.log("OLD DATA >>>", stringData);

        stringData = stringData.replace(/\\''/g, '');

        // Replace quoted string with other content
        dataArray[j] = stringData.replace(
          /'.*?'/,
          `'${newDataArray[lineIndex]}'`
        );

        ++lineIndex;
      }
    }

    console.log(
      "TOTAL LINES IN ",
      `${language}.txt AFTER UPDATION >>>`,
      dataArray.length
    );

    // Join the lines back into a single string
    const modifiedData = dataArray.join("\n");

    // Write the modified content back to the file
    fs.writeFile(`${language}.txt`, modifiedData, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("FILE UPDATED SUCCESSFULLY.");
    });
  });
});
