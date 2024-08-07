const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// cors config
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);

// Define a middleware function to log errors
const logErrors = (err, req, res, next) => {
  // Log the error to the console for debugging purposes
  console.error(err);
  console.error("on req:", req.method, req.path);

  // Pass the error to the next middleware in the stack
  next(err);
};

// Mount the logErrors middleware globally
app.use(logErrors);

const apiRouter = require("./routers/api/router");

app.use("/api", apiRouter);

module.exports = app;
