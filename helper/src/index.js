const axios = require("axios");
const { env } = require("./environment.js");

axios
  .get(`${env.host}/getSlot`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
