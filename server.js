require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGO_URI;

const athletesRouter = require("./routes/api/athletes");
const sportsRouter = require("./routes/api/sports");

//connect to MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(mongoUri, options)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

const { json, urlencoded } = express;
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/app"));

// Routes
app.use("/api/athletes", athletesRouter);
app.use("/api/sports", sportsRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
