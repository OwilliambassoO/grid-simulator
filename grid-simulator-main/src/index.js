const express = require("express");
const async = require("async");
const axios = require("axios");

const app = express();
const port = 9001;
const { slot1, slot2, slot3, slot4 } = require("./slots.js");
const helpers = [
  { baseURL: "http://localhost", port: 9002, inUse: false },
  { baseURL: "http://localhost", port: 9003, inUse: false },
];
const slots = [
  { name: "slot1", value: slot1, calculated: false },
  { name: "slot2", value: slot2, calculated: false },
  { name: "slot3", value: slot3, calculated: false },
  { name: "slot4", value: slot4, calculated: false },
];

const calculateSlot = async () => {
  let result;
  let helperIdx = 0;
  let slotIdx = 0;

  for (const slot of slots) {
    if (!slot.calculated) {
      for (const helper of helpers) {
        if (!helper.inUse) {
          slots[slotIdx].calculated = true;
          helpers[helperIdx].inUse = true;

          await axios
            .post(`${helper.baseURL}:${helper.port}/calculateSlot`, {
              slot: slot.value,
            })
            .then(
              (response) =>
                (result = {
                  slot: slot.name,
                  usedHelper: helper.port,
                  data: response.data === false ? 0 : response.data,
                })
            )
            .catch(
              (error) =>
                (result = {
                  slot: slot.name,
                  usedHelper: helper.port,
                  data: false,
                  errorMessage: error.message,
                })
            );
          helper.inUse = false;
          return result;
        }
        helperIdx++;
      }
    }
    slotIdx++;
  }

  return result;
};

app.get("/", (req, res) => {
  res.send("Servidor funcionando corretamente!");
});

app.get("/execute", (req, res) => {
  async.parallel(
    {
      calculateSlot1: calculateSlot,
      // calculateSlot2: calculateSlot,
      // calculateSlot3: calculateSlot,
      // calculateSlot4: calculateSlot,
    },
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao executar a chamada paralela");
      }

      const resultsArray = [
        results.calculateSlot1,
        // results.calculateSlot2,
        // results.calculateSlot3,
        // results.calculateSlot4,
      ];

      let resultIdx = 0;

      for (const result of resultsArray) {
        if (result === undefined) {
          const invalidHelper = helpers.find(
            (helper) => helper.port === result.usedHelper
          );
          invalidHelper.inUse = true;
          console.log(
            "\x1b[31m%s\x1b[0m",
            `Ajudante ${result.usedHelper} indisponível`
          );

          if (result.slot === "slot1") {
            slots[0].calculated = false;
          }
          if (result.slot === "slot2") {
            slots[1].calculated = false;
          }
          if (result.slot === "slot3") {
            slots[2].calculated = false;
          }
          if (result.slot === "slot4") {
            slots[3].calculated = false;
          }
          console.log(
            "\x1b[32m%s\x1b[0m",
            `Calculando novamente o slot ${resultIdx + 1}`
          );

          resultsArray[resultIdx] = await calculateSlot();
        }
        resultIdx++;
      }

      if (resultsArray.length < Object.entries(results).length) {
        let startIdx = Object.entries(results).length - resultsArray.length;

        for (startIdx; startIdx < Object.entries(results).length; startIdx++) {
          console.log("\x1b[32m%s\x1b[0m", `Calculando o slot ${startIdx + 1}`);
          resultsArray.push(await calculateSlot());
        }
      }

      let sum = 0;

      for (const resultArray of resultsArray) {
        sum = sum + resultArray.data;
      }

      res.send({ array: resultsArray, sum: sum });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
