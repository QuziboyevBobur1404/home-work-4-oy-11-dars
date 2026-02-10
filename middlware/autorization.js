
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization; 

    if (!authorization) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    const token = authorization.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded; 
    next();             

  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
