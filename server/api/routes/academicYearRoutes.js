const express = require("express");
const router = express.Router();
const academicYear = require("../models/academicYear");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const academicYear = await academicYear.find({});
    console.log(academicYear);
    res.status(200).send({ data: academicYear });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  const Year = new academicYear({
    name: req.body.name,
    dateAdded: new Date(),
  });

  Year.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم إضافة عام دراسى بنجاح", data: data });
  });
});

router.patch("/update", requireAuth, (req, res) => {
  academicYear.findOneAndUpdate(
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
  academicYear.deleteOne({ _id: req.body._id }, (err, data) => {
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
