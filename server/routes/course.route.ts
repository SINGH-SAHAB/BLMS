import express from "express";
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  // addTestQuestion,
  deleteCourse,
  // deleteTestQuestion,
  editCourse,
  // editTestQuestion,
  generateYouTubeVideoUrl,
  getAdminAllCourses,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  // getTestQuestions,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

// courseRouter.post("/create-test" ,isAutheticated, authorizeRoles("admin"),addTestQuestion);
// courseRouter.put("/edit-test/:testQuestionId" ,isAutheticated, authorizeRoles("admin"),editTestQuestion);
// courseRouter.delete("/delete-test/:testQuestionId" ,isAutheticated, authorizeRoles("admin"),deleteTestQuestion);
// courseRouter.get('/get-test',isAutheticated ,getTestQuestions);


courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRoles("admin","teacher"),
  uploadCourse
);


courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizeRoles("admin","teacher"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get(
  "/get-admin-courses",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);

courseRouter.put("/add-question", isAutheticated, addQuestion);

courseRouter.put("/add-answer", isAutheticated, addAnwser);

courseRouter.put("/add-review/:id", isAutheticated, addReview);

courseRouter.put(
  "/add-reply",
  isAutheticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRouter.post("/getYouTubeOTP", generateYouTubeVideoUrl);

courseRouter.delete(
  "/delete-course/:id",
  isAutheticated,
  authorizeRoles("admin","teacher"),
  deleteCourse
);

export default courseRouter;
