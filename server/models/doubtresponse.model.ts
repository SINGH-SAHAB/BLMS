//require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";


export interface IDoubtReponse extends Document {
  //UserId: string;
  //TeacherId: string;
  DoubtId: string;
  Response: string;
  ImageUrls: string[];
  
}

const doubtResponseSchema= new Schema<IDoubtReponse>({
    // UserId: {
    //   type: String,
    //   required: true,
    // },
    // TeacherId: {
    //   type: String,
    //   required: true,
    // },
    DoubtId: {
      type: String,
      required: true,
    },
    Response: {
      type: String,
      required: true,
    },
    ImageUrls: {
        type: [String],
        default: [],
    }
},{ timestamps: true },
);

const DoubtResponseModel: Model<IDoubtReponse> = mongoose.model("DoubtResponse", doubtResponseSchema);

export default DoubtResponseModel;