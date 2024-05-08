import express from "express";
import {
  NewPass,
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  resendActivationCode,
  resetPassMail,
  socialAuth,
  updateAccessToken,
  updateNewPassword,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
  getUserInformation,
  updateUserRoleById,
  updateBackgroundPicture,
  updateAbout,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/resend-activation", resendActivationCode);

userRouter.post("/reset-pass", resetPassMail);

userRouter.post("/activate-user", activateUser);

userRouter.post("/new-pass", NewPass);

userRouter.put("/update-new-password", updateNewPassword);

userRouter.post("/login", loginUser);

userRouter.get("/logout",isAutheticated, logoutUser);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.post("/getInfo", 
isAutheticated, 
getUserInformation);

userRouter.get("/refresh", updateAccessToken);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info",isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updatePassword);

userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

userRouter.put("/update-user-bgPicture", isAutheticated, updateBackgroundPicture);

userRouter.put("/update-user-About",  updateAbout);

userRouter.get(
  "/get-users",
  isAutheticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user",
  isAutheticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.put(
  "/update-user-byID",
  isAutheticated,
  authorizeRoles("admin"),
  updateUserRoleById
);

userRouter.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
