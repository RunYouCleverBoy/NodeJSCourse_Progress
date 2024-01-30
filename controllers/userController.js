const fs = require('fs');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.checkID = async (req, res, next, val) => {
  console.log(`User id is: ${val}`);
  let id = req.params.id * 1;
  let user = User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  let id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.postNewUser = catchAsync((req, res) => {
  const user = User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
