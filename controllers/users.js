import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];

    // allUserDetails.push(User.name)
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user.id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        JoinedOn: user.JoinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    console.log(error)
    // should we do console log here instead of sending res to those eerorrs ok
    res.status(404).json({ message: error.message });
  }
};

// export default getAllUsers;

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Profile unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
