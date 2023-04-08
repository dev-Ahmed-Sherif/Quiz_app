const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const con = require("./database/conn");

const academicYearRouter = require("./api/routes/academicYearRoutes");
const questionRouter = require("./api/routes/questionRoutes");
const quizRouter = require("./api/routes/quizRoutes");
const subjectRouter = require("./api/routes/subjectRoutes");
const userRouter = require("./api/routes/userRoutes");

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/academic-year", academicYearRouter);
app.use("/api/questions", questionRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello to System");
});

app.listen(process.env.PORT || 7000, () => {
  console.log("server on", process.env.PORT);
});
