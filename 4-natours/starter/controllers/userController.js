const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory')


const filterObj = (obj, ...allowedFields) => {
  let newObj = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user posts pw data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for pw updates. Please use /updateMyPassword', 400))
  }
  //2) filter fields
  const filteredBody = filterObj(req.body, 'name', 'email')
  //3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, { new: true, runValidators: true })

  res.status(200).json({
    status: 'success',
    user: updatedUser
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })

})






exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined. Please use /signup instead',
  });
};


exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)

//Do NOT update pw with this
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)

