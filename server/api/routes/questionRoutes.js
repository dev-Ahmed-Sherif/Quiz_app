const express = require("express");
const router = express.Router();
const Ques = require("../models/question");

router.get("/", (req, res) => {
  Ques.find((err, data) => {
    if (err) {
      res.send({ message: "No Data" });
    }
    res.sendStatus(200).send({ data: data });
  });
});

router.post("/create", (req, res) => {
  const ques = new Ques({
    name: req.name,
    dateAdded: new Date(),
  });

  Subject.save().then((result) => {
    console.log(result);
    res.send("New Subject created");
  });
});

module.exports = router;
