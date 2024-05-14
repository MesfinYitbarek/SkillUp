import errorHandler from "../Utils/error.js";
import bcryptjs from 'bcryptjs'
import User from "../models/User.js";
export const test = (req, res) => {
  res.json({
    message: "Hello World!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, " You can only update your own account!"));
  try {
    if (req.body.passowrd) {
      req.body.password = bcryptjs.hashSync(req.body.passowrd, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passowrd: req.body.passowrd,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { passowrd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
