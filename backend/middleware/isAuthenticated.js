const jwt = require('jsonwebtoken');

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'User not authenticated', success: false });
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyToken(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Error while authenticating user', success: false });
  }
};

module.exports = isAuthenticated;
