var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var test_api = require("./routes/test-api");
var usermanagement = require("./routes/user-management");
var patientregistration = require("./routes/patient-registration");
var masters = require("./routes/master-lists");
var dialysis = require("./routes/dialysis-api");

const {
  middlewareVerifyToken,
  middlewareDecryptReceivedRequest,
} = require("./services/utils");

var app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Decrypt request
app.use(middlewareDecryptReceivedRequest);

// Secure routes

app.use("/test-api", middlewareVerifyToken, test_api);
app.use("/user-management", usermanagement);
app.use("/patient-registration", middlewareVerifyToken, patientregistration);
app.use("/master-lists", middlewareVerifyToken, masters);
app.use("/dialysis-api", middlewareVerifyToken, dialysis);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
