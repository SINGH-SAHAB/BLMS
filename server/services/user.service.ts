import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (res:Response,id: string,role:string) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
}

export const getUserIdByEmailMobileAndName = async (email: string, phoneNumber: string, name: string, res: Response) => {
  // Fetch user ID based on the provided email
  const userId = await redis.get(`email:${email}`);

  if (!userId) {
    // If no user ID is found for the provided email, return a 404 response
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Fetch user details based on the retrieved user ID
  const userJson = await redis.get(userId);
  if (!userJson) {
    // If user details are not found, return a 404 response
    return res.status(404).json({
      success: false,
      message: 'User details not found',
    });
  }

  // Parse the user details
  const user = JSON.parse(userJson);

  // Compare the name and mobile number (phoneNumber)
  if (user.name === name && user.phoneNumber === phoneNumber) {
    // If name and mobile number match, return the user ID
    return res.status(200).json({
      success: true,
      userId: userId,
    });
  } else {
    // If name or mobile number does not match, return a 404 response
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
};
