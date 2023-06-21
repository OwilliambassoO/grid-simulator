const express = require("express");
const app = express();

app.use(express.json());

app.post("/calculateSlot", (req, res) => {
  const { slot } = req.body;
  res.send(slot);
});

const createServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

createServer(9002);
