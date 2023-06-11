const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const { requireAuth } = require("../middleware/authMiddleware");

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const subject = await Subject.find({});
    // console.log(subject);
    res.status(200).send({ data: subject });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  console.log(req.body);
  const subject = new Subject({
    name: req.body.name,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
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

router.delete("/delete", requireAuth, async (req, res) => {
  console.log(req.body);
  try {
    const subject = await Subject.deleteOne({ _id: req.body._id });
    if (subject) {
      console.log(subject);
      const subjects = await Subject.find({});
      res.status(200).send({ message: "تم الحذف بنجاح", data: subjects });
    } else {
      res.send({ message: "لم يتم الحذف" });
    }
  } catch (error) {
    console.log(error);
  }

  // Subject.deleteOne({ _id: req.body._id }, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({ message: "لم يتم الحذف" });
  //   } else {

  //   }
  // });
});

module.exports = router;
