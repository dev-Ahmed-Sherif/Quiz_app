const express = require("express");
const router = express.Router();
const academicYear = require("../models/academicYear");
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
    // console.log("logedGetYear");
    const year = await academicYear.find({});
    // console.log(year);
    res.status(200).send({ data: year });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  const Year = new academicYear({
    name: req.body.name,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
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

router.delete("/delete", requireAuth, async (req, res) => {
  // console.log(req.body);
  try {
    const year = await academicYear.deleteOne({ _id: req.body._id });
    if (year) {
      console.log(year);
      const years = await academicYear.find({});
      res.status(200).send({ message: "تم الحذف بنجاح", data: years });
    } else {
      res.send({ message: "لم يتم الحذف" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
