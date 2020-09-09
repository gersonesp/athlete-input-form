const { Router } = require("express");
const router = Router();

const Athlete = require("../../db/models/Athlete");

router.get("/", async (req, res, next) => {
  try {
    const athleteList = await Athlete.find();

    res.send(athleteList);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      sport,
      nationality,
      gender,
      dob,
      team,
      location,
      marital,
    } = req.body;
    if (
      !name ||
      !sport ||
      !nationality ||
      !gender ||
      !dob ||
      !team ||
      !location ||
      !marital
    ) {
      res.status(400).send("Invalid inputs");
      return;
    }

    const newAthlete = new Athlete(req.body);
    await newAthlete.save();

    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      _id,
      name,
      sport,
      nationality,
      gender,
      dob,
      team,
      location,
      marital,
      description,
    } = req.body;
    if (
      (!_id,
      !name ||
        !sport ||
        !nationality ||
        !gender ||
        !dob ||
        !team ||
        !location ||
        !marital)
    ) {
      res.status(400).send("Invalid inputs");
      return;
    }

    const athlete = await Athlete.findById(_id);

    if (athlete._id == _id) {
      athlete.name = name;
      athlete.sport = sport;
      athlete.nationality = nationality;
      athlete.gender = gender;
      athlete.dob = dob;
      athlete.team = team;
      athlete.location = location;
      athlete.marital = marital;
      if (description) {
        athlete.description = description;
      }

      athlete.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

module.exports = router;
