const dotenv = require("dotenv");

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL || "";
const URL = process.env.URL || "localhost";
const PORT = process.env.PORT || 3000;
module.exports = { DATABASE_URL, URL, PORT };
