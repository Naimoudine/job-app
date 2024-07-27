require("dotenv").config();

require("./database/client").checkConnection();

const app = require("./app/config");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`application is listening on port ${PORT}`);
});
