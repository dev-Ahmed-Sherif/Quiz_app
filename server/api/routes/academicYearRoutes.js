const express = require("express");
const router = express.Router();
const academicYear = require("../models/academicYear");

router.get("/", (req, res) => {
  academicYear.find((err, data) => {
    if (err) {
      res.send({ message: "No Data" });
    }
    res.sendStatus(200).send({ data: data });
  });
});

router.post("/create", (req, res) => {
  const Year = new academicYear({
    name: req.name,
    dateAdded: new Date(),
  });

  Year.save().then((result) => {
    console.log(result);
    res.send("New Year created");
  });
});

module.exports = router;
