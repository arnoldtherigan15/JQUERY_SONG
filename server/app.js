require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(router);
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
