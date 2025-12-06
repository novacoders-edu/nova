const app = require("./src/app");
const connecttoDB = require("./src/db/db");
require("dotenv").config();

connecttoDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
