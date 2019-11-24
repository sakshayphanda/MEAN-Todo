const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
 // console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization;
   // console.log(token);
    jwt.verify(token, "Sakshayphanda_this_stringshouldbelonger");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
