import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
    addDoubt,
    addDoubtResponse
} from "../controllers/doubt.controller";

const doubtRouter = express.Router();

doubtRouter.post("/add-doubt", addDoubt);
doubtRouter.post("/add-doubt-response", addDoubtResponse);

export default doubtRouter;