const express = require("express");
const app = express();

app.use(express.json());

app.post("/calculateSlot", (req, res) => {
  const { slot } = req.body;

  const letters = new Set(
    slot.filter((letter) => letter !== "").map((letter) => letter.toLowerCase())
  );
  const letterMap = new Map(
    [...letters].map((letter, index) => [letter, index])
  );
  let convertedArray = slot.map((letter) =>
    letter === "" ? "" : letterMap.get(letter.toLowerCase())
  );

  function sliceArray(data) {
    const firstSegment = data.slice(0, 9);
    const secondSegment = data.slice(9, 18);
    const thirdSegment = data.slice(18, 27);

    return {
      firstSegment,
      secondSegment,
      thirdSegment,
    };
  }

  function checkSegments(firstSegment, secondSegment, thirdSegment) {
    let resto = 0;

    for (i = 8; i >= 0; i--) {
      sum = firstSegment[i] + secondSegment[i] + resto;

      if (sum > 9) {
        sum = sum - 10;
        resto = 1;
      } else {
        resto = 0;
      }

      if (sum !== thirdSegment[i]) {
        return false;
      }
    }
    return true;
  }

  function printArray(data) {
    console.log(
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8]
    );
    console.log(
      data[9],
      data[10],
      data[11],
      data[12],
      data[13],
      data[14],
      data[15],
      data[16],
      data[17]
    );
    console.log(
      data[18],
      data[19],
      data[20],
      data[21],
      data[22],
      data[23],
      data[24],
      data[25],
      data[26]
    );
    console.log("========================");
  }

  function changeValues(array, valueFrom, valueTo) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === valueFrom) {
        array[i] = valueTo;
      } else if (array[i] === valueTo) {
        array[i] = valueFrom;
      }
    }
    return array;
  }

  let segments = sliceArray(convertedArray);
  let sum;
  let i;

  const backupArray = JSON.parse(JSON.stringify(convertedArray));
  let matchArray = JSON.parse(JSON.stringify(convertedArray));

  let isValid = checkSegments(
    segments.firstSegment,
    segments.secondSegment,
    segments.thirdSegment
  );

  printArray(convertedArray);

  let soma = 0;

  if (!isValid) {
    for (let i = 0; i < 10; i++) {
      convertedArray = JSON.parse(JSON.stringify(backupArray));

      if (isValid) {
        matchArray = JSON.parse(JSON.stringify(convertedArray));
        break;
      }

      for (let j = 0; j < 10; j++) {
        convertedArray = changeValues(convertedArray, i, j);
        segments = sliceArray(convertedArray);
        isValid = checkSegments(
          segments.firstSegment,
          segments.secondSegment,
          segments.thirdSegment
        );

        if (isValid) {
          matchArray = JSON.parse(JSON.stringify(convertedArray));
          break;
        }

        const backupArray2 = JSON.parse(JSON.stringify(convertedArray));

        for (let k = 0; k < 10; k++) {
          convertedArray = changeValues(convertedArray, j, k);
          segments = sliceArray(convertedArray);
          isValid = checkSegments(
            segments.firstSegment,
            segments.secondSegment,
            segments.thirdSegment
          );

          if (isValid) {
            matchArray = JSON.parse(JSON.stringify(convertedArray));
            break;
          }

          const backupArray3 = JSON.parse(JSON.stringify(convertedArray));

          for (let l = 0; l < 10; l++) {
            convertedArray = changeValues(convertedArray, k, l);
            segments = sliceArray(convertedArray);
            isValid = checkSegments(
              segments.firstSegment,
              segments.secondSegment,
              segments.thirdSegment
            );
            if (isValid) {
              matchArray = JSON.parse(JSON.stringify(convertedArray));
              break;
            }

            const backupArray4 = JSON.parse(JSON.stringify(convertedArray));

            for (let m = 0; m < 10; m++) {
              convertedArray = changeValues(convertedArray, l, m);
              segments = sliceArray(convertedArray);
              isValid = checkSegments(
                segments.firstSegment,
                segments.secondSegment,
                segments.thirdSegment
              );
              if (isValid) {
                matchArray = JSON.parse(JSON.stringify(convertedArray));
                break;
              }

              const backupArray5 = JSON.parse(JSON.stringify(convertedArray));

              for (let n = 0; n < 10; n++) {
                convertedArray = changeValues(convertedArray, m, n);
                segments = sliceArray(convertedArray);
                isValid = checkSegments(
                  segments.firstSegment,
                  segments.secondSegment,
                  segments.thirdSegment
                );
                if (isValid) {
                  matchArray = JSON.parse(JSON.stringify(convertedArray));
                  break;
                }

                const backupArray6 = JSON.parse(JSON.stringify(convertedArray));

                for (let o = 0; o < 10; o++) {
                  convertedArray = changeValues(convertedArray, n, o);
                  segments = sliceArray(convertedArray);
                  isValid = checkSegments(
                    segments.firstSegment,
                    segments.secondSegment,
                    segments.thirdSegment
                  );
                  if (isValid) {
                    matchArray = JSON.parse(JSON.stringify(convertedArray));
                    break;
                  }

                  const backupArray7 = JSON.parse(
                    JSON.stringify(convertedArray)
                  );

                  for (let p = 0; p < 10; p++) {
                    convertedArray = changeValues(convertedArray, o, p);
                    segments = sliceArray(convertedArray);
                    isValid = checkSegments(
                      segments.firstSegment,
                      segments.secondSegment,
                      segments.thirdSegment
                    );
                    if (isValid) {
                      matchArray = JSON.parse(JSON.stringify(convertedArray));
                      break;
                    }

                    const backupArray8 = JSON.parse(
                      JSON.stringify(convertedArray)
                    );

                    for (let q = 0; q < 10; q++) {
                      convertedArray = changeValues(convertedArray, p, q);
                      segments = sliceArray(convertedArray);
                      isValid = checkSegments(
                        segments.firstSegment,
                        segments.secondSegment,
                        segments.thirdSegment
                      );
                      if (isValid) {
                        matchArray = JSON.parse(JSON.stringify(convertedArray));
                        break;
                      }

                      const backupArray9 = JSON.parse(
                        JSON.stringify(convertedArray)
                      );

                      for (let r = 0; r < 10; r++) {
                        convertedArray = changeValues(convertedArray, q, r);
                        segments = sliceArray(convertedArray);
                        isValid = checkSegments(
                          segments.firstSegment,
                          segments.secondSegment,
                          segments.thirdSegment
                        );
                        if (isValid) {
                          matchArray = JSON.parse(
                            JSON.stringify(convertedArray)
                          );
                          break;
                        }
                        convertedArray = JSON.parse(
                          JSON.stringify(backupArray9)
                        );
                      }
                      convertedArray = JSON.parse(JSON.stringify(backupArray8));
                    }
                    convertedArray = JSON.parse(JSON.stringify(backupArray7));
                  }
                  convertedArray = JSON.parse(JSON.stringify(backupArray6));
                }
                convertedArray = JSON.parse(JSON.stringify(backupArray5));
              }
              convertedArray = JSON.parse(JSON.stringify(backupArray4));
            }
            convertedArray = JSON.parse(JSON.stringify(backupArray3));
          }
          convertedArray = JSON.parse(JSON.stringify(backupArray2));
        }
        convertedArray = JSON.parse(JSON.stringify(backupArray));
      }
    }

    segments = sliceArray(convertedArray);
    checkSegments(
      segments.firstSegment,
      segments.secondSegment,
      segments.thirdSegment
    );
    printArray(convertedArray);
  } else {
    res.send(soma);
  }

  for (let i = 18; i < 27; i++) {
    soma = soma + matchArray[i];
  }

  res.send(soma);
});

const createServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

createServer(9002);
