
import NotificationModel, { INotification } from "../models/notification.Model";
import AdminNotification, { IAdminNotif } from "../models/adminNotif.model";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";
import userModel from "../models/user.model";
// get all notifications --- only admin
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await AdminNotification.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update notification status --- only admin
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;

      const notification = await AdminNotification.findById(id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        console.log("Notification Title:", notification.title); // Log the notification title
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }
      
      await notification.save();

      const notifications = await AdminNotification.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// delete notification --- only admin
cron.schedule("0 0 0 * * *", async() => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({status:"read",createdAt: {$lt: thirtyDaysAgo}});
  console.log('Deleted read notifications');
});


export const TeacherVerificationNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userID } = req.body; 

      console.log(userID);

      const user = await userModel.findById(userID);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      res.status(201).json({
        success: true,
        user: user,
      });
      // Create a new notification for teacher verification request
      const newNotification: IAdminNotif = await AdminNotification.create({
        title: `Instructor Verification Request by ${user.name}`,
        message:"click here to verify",
        userId:userID // Add the user ID to the notification
      }); 

      res.status(201).json({
        success: true,
        notification: newNotification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);