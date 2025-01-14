const express = require("express");
const connectDb = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const noRoute = require("./middleware/noRoute");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const userControllar = require("./controllar/userControllar");
const verifyAdminstation = require("./middleware/verifyAdminstration");
const app = express();
const port = process.env.PORT ?? 3000;
require("dotenv").config();

// connect Database
connectDb();

// cors setup
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
// custom middleware
app.use("/users", verifyAdminstation.verifyAdmin);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/reg", userControllar.register);
app.post("/login", userControllar.login);
app.put("/profile/:id", userControllar.updateProfile);
app.get("/users", userControllar.getUsers);

// Error handling middleware
app.use(noRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
