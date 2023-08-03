const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  const bodyToken = req.body.token;
  // console.log(req);
  // console.log(req.cookies);
  // console.log(bodyToken);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send({ message: err.message });
      } else {
        // console.log(decodedToken);
        // const loginUser = await User.findById(decodedToken.id);
        next();
      }
    });
  } else if (bodyToken) {
    jwt.verify(
      bodyToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.send({ message: err.message });
        } else {
          // console.log(decodedToken);
          // const loginUser = await User.findById(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("not allowed");
    res.send({ message: "غير مصرح لك بدخول السيستم" });
  }
};

module.exports = { requireAuth };
