//TODO Implement user authentication logic here
//TODO For simplicity, this code assumes user authentication is already handled.
//TODO Set req.user with user details after successful authentication.
//TODO Decode jwt token and compare id to DB Id

const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/env");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token", token);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Forbidden",
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};

const checkRole = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).send("Access denied: Should be an admin");
  }
  next();
};

module.exports = {
  verifyJWT,
  checkRole,
};
