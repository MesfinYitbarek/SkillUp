import errorHandler from "../Utils/error.js";
import bcryptjs from "bcryptjs";
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

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// display users for editing based on there id
export const userEdit = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAdmin = async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "User not found!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
}

export const updateAdmin = async (req, res, next) => {
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
          role: req.body.role,
        },
      },
      { new: true }
    );

    const { passowrd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}