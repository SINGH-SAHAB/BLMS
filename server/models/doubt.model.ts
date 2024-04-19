//require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";


export interface IDoubt extends Document {
  UserId: string;
  TeacherId: string;
  CourseId: string;
  Question: string;
  ImageUrl: string;
  
}

const doubtSchema= new Schema<IDoubt>({
    UserId: {
      type: String,
      required: true,
    },
    TeacherId: {
      type: String,
      required: true,
    },
    CourseId: {
      type: String,
      required: true,
    },
    Question: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
     // required: true,
    }, 
},{ timestamps: true },
);

const DoubtModel: Model<IDoubt> = mongoose.model("Doubt", doubtSchema);

export default DoubtModel;
