const express = require("express");
const app = express();
const { slot1, slot2, slot3, slot4 } = require("./slots.js");

let slot1Free = true;
let slot2Free = true;
let slot3Free = true;
let slot4Free = true;

app.get("/getSlot", (req, res) => {
  if (slot1Free) {
    slot1Free = false;
    return res.send(slot1);
  }
  if (slot2Free) {
    slot2Free = false;
    return res.send(slot2);
  }
  if (slot3Free) {
    slot3Free = false;
    return res.send(slot3);
  }
  if (slot4Free) {
    slot4Free = false;
    return res.send(slot4);
  }
});

const createServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

createServer(9001);
