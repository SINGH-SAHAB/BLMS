require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ITeacher extends Document {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  }; // Specific to teacher model
  role: string;
  isVerified: boolean;
  courseCreated: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const teacherSchema: Schema<ITeacher> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the teacher's name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the teacher's email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    phoneNumber:{
         type: Number,
         maxlength:[10, "mobile no length is 10"],
         minlength:[10,"mobile no length is 10"],
         required: [true, "Please enter the teacher's mobile Number"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    courseCreated: [
      {
        courseId: String,
      }
    ],
    role: {
      type: String,
      // default: "teacher",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash Password before saving
teacherSchema.pre<ITeacher>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access token
teacherSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign refresh token
teacherSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// compare password
teacherSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const teacherModel: Model<ITeacher> = mongoose.model("Teacher", teacherSchema);

export default teacherModel;