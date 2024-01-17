var jwt = require("jsonwebtoken");
require("dotenv").config();
const secureKey = process.env.secureKey;

const role = (...role) => {
  return (req, res, next) => {
    try {
      const token = req.header("auth-token");
      if (!token) {
        return res
          .status(401)
          .json({ error: "Authenticate using a valid Token" });
      }

      const data = jwt.verify(token, secureKey);
      if (!role.includes(data.user.role)) {
        return res.status(401).json({ error: "Access denied " });
      }
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).json({ error: "token expire" });
    }
  };
};

module.exports = role;
