const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

const userRouter = require("./routes/userRoute");
const phoneRouter = require("./routes/phoneRouter");
const accessoriesRouter = require("./routes/accessoriesRouter");
const wantedRouter = require("./routes/wantedRouter");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ extended: true, limit: "10mb" }));
app.use(cookieParser());
// app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/phones", phoneRouter);
app.use("/api/v1/accessories", accessoriesRouter);
app.use("/api/v1/wanted", wantedRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
