const { readFileSync } = require("fs");

function directorySummer(filename) {
  var rawData = readFileSync(filename, "utf-8").split("\n");

  //add dummy endpoint to input data
  rawData.push("$ cd ****end****");

  const arrOfDirs = [];

  for (i = 0; i < rawData.length; i++) {
    if (rawData[i].includes("$ cd") && !rawData[i].includes(".")) {
      arrOfDirs.push([i, rawData[i]]);
    }
  }

  for (j = 0; j < arrOfDirs.length - 1; j++) {
    for (i = arrOfDirs[j][0] + 2; i < arrOfDirs[j + 1][0]; i++) {
      arrOfDirs[j].push(rawData[i]);
    }
  }

  arrOfDirs.reverse();

  var arrOfDirNames = [];

  arrOfDirs.forEach((dir) => {
    arrOfDirNames.push(dir[1].replace("$ cd ", ""));
    dir.shift();

    for (i = 0; i < dir.length; i++) {
      if (dir[i].includes("dir ")) {
        const dirIndex = arrOfDirNames.lastIndexOf(dir[i].replace("dir ", ""));
        console.log(dirIndex);
        dir[i] = arrOfDirs[dirIndex];
      }
    }
  });

  console.log(arrOfDirNames);

  for (i = 0; i < arrOfDirs.length; i++) {
    arrOfDirs[i] = arrOfDirs[i].flat(Infinity);
  }

  for (i = 0; i < arrOfDirs.length; i++) {
    var size = 0;
    for (let num of arrOfDirs[i]) {
      if (parseInt(num.split(" ")[0]) > 0) {
        size += parseInt(num.split(" ")[0]);
      }
    }
    arrOfDirs[i] = [arrOfDirs[i][0], size];
  }

  var sumOfBigDirectories = 0;

  arrOfDirs.forEach((arr) => {
    if (arr[1] < 100000) {
      sumOfBigDirectories += arr[1];
    }
  });

  console.log(sumOfBigDirectories);
  console.log(arrOfDirs.filter((arr) => arr[1] < 100000));
}

directorySummer("day_7/terminalOutput.txt");
