const express = require("express");
const router = express.Router();
const Ques = require("../models/question");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, (req, res) => {
  Ques.find((err, data) => {
    if (err) {
      res.send({ message: "لا يوجد بيانات" });
    }
    res.sendStatus(200).send({ data: data });
  });
});

router.post("/create", requireAuth, (req, res) => {
  const ques = new Ques({
    name: req.body.name,
    dateAdded: new Date(),
  });

  ques.save().then((data) => {
    console.log(data);
    res.send("تم إضافة السؤال بنجاح");
  });
});

router.patch("/update", requireAuth, (req, res) => {});

router.delete("/delete", requireAuth, (req, res) => {
  Ques.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ message: "لم يتم حذف السؤال" });
    } else {
      console.log(data);
      res.sendStatus(200).send({ message: "تم حذف السؤال بنجاح" });
    }
  });
});

module.exports = router;
