import mongoose, { Document, Model, Schema } from "mongoose";

// Teacher interface
export interface ITeacherNotif extends Document {
    title: string;
    message: string;
    status: string;
    userId: string;
}

// Teacher schema
const teacherSchema = new Schema<ITeacherNotif>(
    {
        title:{
        type: String,
        required: true
    },
    message:{
        type:String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "unread"
    },
    userId:{
        type: String,
        required: true
    }
    },{timestamps: true});

// Teacher model
const TeacherModel: Model<ITeacherNotif> = mongoose.model('Teacher', teacherSchema);

export default TeacherModel;