import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import DoubtModel from "../models/doubt.model";
import DoubtResponseModel from "../models/doubtresponse.model";
import NotificationModel from "../models/notification.Model";
import teacherModel from "../models/teacher.model";


interface IDoubt {
    UserId: string;
    TeacherId: string;
    CourseId: string;
    Question: string;
    ImageUrl?: string;
}

// Function to add a new doubt
export const addDoubt = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { UserId, TeacherId, CourseId, Question, ImageUrl } = req.body;

            const newDoubt: IDoubt = {
                UserId,
                TeacherId,
                CourseId,
                Question,
                ImageUrl,
            };

            const doubt = await DoubtModel.create(newDoubt);

           // const doubtId = doubt._id;
            
            // Fetch the teacher's information from the database
            // For simplicity, assuming there's a TeacherModel with the necessary fields
           // const teacher = await teacherModel.findById(TeacherId);

          //  const notificationMessage = `New doubt added by ${UserId} in course ${CourseId}`;
          //  await NotificationModel.create({ recipient: teacher, message: notificationMessage });

            res.status(201).json({
                success: true,
                doubt,
               // doubtId,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Function to get all doubts
export const getDoubts = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doubts = await DoubtModel.find();
            
            res.status(200).json({
                success: true,
                doubts,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IDoubtResponse {
    DoubtId: string;
    //UserId: string;
    //TeacherId: string;
    //CourseId: string;
    Response: string;
    ImageUrls?: string[];
}

// Function to add a new doubt
export const addDoubtResponse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { DoubtId, Response, ImageUrls } = req.body;

            const newDoubtResponse: IDoubtResponse = {
               DoubtId,
                Response,
                ImageUrls,
            };

            const doubtResponse = await DoubtResponseModel.create(newDoubtResponse);

            const doubtDetails = await DoubtModel.findById(DoubtId);

            if (!doubtDetails) {
                return next(new ErrorHandler("Doubt not found", 404));
            }
            
            // Fetch the teacher's information from the database
            // For simplicity, assuming there's a TeacherModel with the necessary fields
           // const teacher = await teacherModel.findById(TeacherId);

          //  const notificationMessage = `New doubt added by ${UserId} in course ${CourseId}`;
          //  await NotificationModel.create({ recipient: teacher, message: notificationMessage });

            res.status(201).json({
                success: true,
                doubtResponse,
                doubtDetails,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);