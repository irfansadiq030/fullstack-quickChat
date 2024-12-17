const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const dbConfig = require("./config/dbConfig");

const app = require("./app");
const port = process.env.PORT_NUMBER || 4000;

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
