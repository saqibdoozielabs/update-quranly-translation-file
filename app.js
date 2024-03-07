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
    // data type is string and jsonData type is object

    const translations = jsonData["translations"];

    let newDataArray = [];

    for (let i = 0; i < translations.length; i++) {
      const getText = translations[i]["text"];

      newDataArray.push(getText);
    }

    console.log("NUMBER OF TRANSLATIONS TO UPDATE >>>", newDataArray.length);

    let lineIndex = 0;

    for (let j = 0; j < dataArray.length; j++) {
      if (
        !(
          dataArray[j].includes("INSERT INTO `translation`") ||
          dataArray[j].length == 0
        )
      ) {
        const stringData = dataArray[j];
        // console.log("OLD DATA >>>", stringData);

        // (6236, 114, 6, 'In the Name of Allah','english'),
        const firstIndex = stringData.indexOf(", '"); // index of 6
        const secondIndex = stringData.indexOf(`,'${language}')`); // index of "," at start ,'english'

        const startIndex =
          firstIndex == -1 ? stringData.indexOf(",'") : firstIndex;
        const endIndex =
          secondIndex == -1
            ? stringData.indexOf(`, '${language}')`)
            : secondIndex;

        var updatedLine = `${stringData.slice(0, startIndex)}, '${
          newDataArray[lineIndex]
        }'${stringData.slice(endIndex)}`;

        // console.log("UPDATED LINE >>>", updatedLine);

        dataArray[j] = updatedLine;

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
