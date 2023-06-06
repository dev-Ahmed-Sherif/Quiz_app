const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const subject = await Subject.find({});
    console.log(subject);
    res.status(200).send({ data: subject });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  console.log(req.body);
  const subject = new Subject({
    name: req.body.name,
    dateAdded: new Date(),
  });

  subject.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم إضافة مادة دراسية بنجاح", data: data });
  });
});

router.patch("/update", requireAuth, (req, res) => {
  Subject.findOneAndUpdate(
    { _id: req.body._id },
    { name: req.body.name },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send({ message: "لم يتم التعديل" });
      } else {
        console.log(data);
        res.status(200).send({ message: "تم التعديل بنجاح", data: data });
      }
    }
  );
});

router.delete("/delete", requireAuth, (req, res) => {
  Subject.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ message: "لم يتم الحذف" });
    } else {
      console.log(data);
      res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  });
});

module.exports = router;
