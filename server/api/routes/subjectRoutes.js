const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");

router.get("/", (req, res) => {
  Subject.find((err, data) => {
    if (err) {
      res.send({ message: "No Data" });
    }
    res.sendStatus(200).send({ data: data });
  });
});

router.post("/create", (req, res) => {
  const subject = new Subject({
    name: req.name,
    dateAdded: new Date(),
  });

  Subject.save().then((result) => {
    console.log(result);
    res.send("New Subject created");
  });
});

module.exports = router;
