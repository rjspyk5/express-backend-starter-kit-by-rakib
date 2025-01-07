const express = require("express");
const connectDb = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT ?? 3000;
require("dotenv").config();

// cors setup
app.use(
  cors({
    origin: ["http://localhost:5173", "Here will be added website link"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// connect Database
connectDb();

// middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
