const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields',
        success: false,
      });
    }

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, userEmail, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while registering user', success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields',
        success: false,
      });
    }

    const checkUser = await User.findOne({ userEmail });

    if (!checkUser) {
      return res.status(401).json({
        message: 'User not found',
        success: false,
      });
    }

    const isMatchedPassword = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!isMatchedPassword) {
      return res.status(401).json({
        message: 'Incorrect password',
        success: false,
      });
    }

    const accessToken = jwt.sign(
      {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back ${checkUser.userName}`,
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while logging in user', success: false });
  }
};

module.exports = { signupUser, loginUser };
