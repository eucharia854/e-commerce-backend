const jwt = require("jsonwebtoken");
const checkIfUserIsAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }
  req.user = decoded.user;
  next();
};
module.exports = checkIfUserIsAuthenticated;
