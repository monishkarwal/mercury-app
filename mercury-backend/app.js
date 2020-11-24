const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Database
const database = require("./database/database");

// Routes
const singupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");

const app = express();

// App configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/signup", singupRoute);
app.use("/api/login", loginRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`[App] : Listening at port ${PORT}`);
});
