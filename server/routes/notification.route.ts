import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotifications, updateNotification, TeacherVerificationNotification } from "../controllers/notification.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAutheticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRoute.put("/update-notifications", 
// isAutheticated, 
// authorizeRoles("admin"), 
updateNotification);

notificationRoute.post(
  "/teacher-verification-notification",
   isAutheticated,
  //  authorizeRoles("admin"),
  TeacherVerificationNotification
);

export default notificationRoute;
