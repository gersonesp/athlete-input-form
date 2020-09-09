const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

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
