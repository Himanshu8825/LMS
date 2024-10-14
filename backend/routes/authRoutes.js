const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated');

const authRouter = express.Router();

authRouter.post('/signup', signupUser);

authRouter.post('/login', loginUser);

authRouter.get('/check-auth', isAuthenticated, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: 'Authenticated user!',
    user,
  });
});

module.exports = authRouter;
