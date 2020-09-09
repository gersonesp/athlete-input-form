const mongoose = require("mongoose");
const { Schema } = mongoose;

const athleteSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  team: { type: String, required: true },
  location: { type: String, required: true },
  marital: { type: String, required: true },
  description: String,
});

const Athlete = mongoose.model("athlete", athleteSchema);
module.exports = Athlete;
