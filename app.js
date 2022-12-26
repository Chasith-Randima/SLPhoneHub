const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/userRoute");
const phoneRouter = require("./routes/phoneRouter");

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/phones", phoneRouter);

module.exports = app;
