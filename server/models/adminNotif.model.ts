import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAdminNotif extends Document {
    title: string;
    message: string;
    status: string;
    userId: string;
}

// Admin schema
const adminSchema = new Schema<IAdminNotif>(
{title:{
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

// Admin model
const AdminNotification: Model<IAdminNotif> = mongoose.model('AdminNotification', adminSchema);

export default AdminNotification;