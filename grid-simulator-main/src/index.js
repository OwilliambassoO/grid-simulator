const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.get("/execute", async (req, res) => {
  const calcResponse = await main();
  res.send(calcResponse);
});

const createServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

const { slot1, slot2, slot3, slot4 } = require("./slots.js");

const main = async () => {
  let slot1Free = true;
  let slot2Free = true;
  let slot3Free = true;
  let slot4Free = true;
  let slot1Result = null;

  while (slot1Free) {
    try {
      slot1Result = await axios
        .post("http://localhost:9002/calculateSlot", {
          slot: slot1,
        })
        .then(() => (slot1Free = false));
      return slot1Result;
    } catch {
      console.log("Erro na requisição - Computador caiu");
    }
  }
};

createServer(9001);
