const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //here in authorization a must be small
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ msg: "Token is required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.status(403).json({ msg: "Token is invalid" });

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
