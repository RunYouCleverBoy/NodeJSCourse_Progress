const fs = require('fs');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.checkID = async (req, res, next, val) => {
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

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'fail',
      message: 'This route is not for password updates. Please use /updateMyPassword.',
    });
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
