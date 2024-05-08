require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
  getUserIdByEmailMobileAndName

} from "../services/user.service";
import cloudinary from "cloudinary";
import { Interface } from "readline";
// import userModel from "../models/user.model";

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  role:string,
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phoneNumber, password, role, } = req.body;

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        phoneNumber,
        password,
        role,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//forgot pass mail
export const resetPassMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Prepare user data for token creation
    const userData = {
      name: "", // Provide user name if necessary
      email: email,
      phoneNumber: 2, // Provide user phone number if necessary
      password: "", // Provide user password if necessary
      role: "", // Provide user role if necessary
    };

    // Create a new activation token
    const activationToken = createActivationToken(userData);

    // Render email template
    const data = {
      user: { email },
      activationCode: activationToken.activationCode
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/reset-pass-mail.ejs"),
      data
    );

    // Prepare mail data
    const mailData = {
      email,
      subject: "Reset Password",
      template: "reset-pass-mail.ejs",
      data: { user: { email }, activationCode: activationToken.activationCode }
    };

    // Send reset password mail
    await sendMail(mailData);

    // Send response
    res.status(200).json({
      success: true,
      message: `Reset password instructions have been sent to ${email}`,
      activationToken: activationToken.token,
    });
  } catch (error: any) {
    next(new ErrorHandler(error.message || "Failed to send reset password email", 400));
  }
};

// Add the resendActivationCode function here

export const resendActivationCode = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { activation_token, activation_code } = req.body as IActivationRequest

    if (!activation_token) {
      return next(new ErrorHandler(`Activation token is required: ${activation_token}`, 400));
    }

    const decodedToken = jwt.verify(activation_token, process.env.ACTIVATION_SECRET as string) as {
      user: any; email: string 
      };
      const decodedDetail = decodedToken.user;
      console.log('Decoded Token:', decodedDetail);

      const  email  = decodedToken.user.email;
      console.log('Email:', email);

   //   const email  = req.body;

      // Check if the user with the provided email exists
      const User: IUser | null = await userModel.findOne({ email });
      if (User) {
        return next(new ErrorHandler("Email already exist", 400));
       }

      // Create a new activation token
      const activationToken = createActivationToken(decodedDetail);
      
      const activationCode = activationToken.activationCode;
      const data = { user: email , activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      // Prepare mail data
      const mailData = {
          email,
          subject: "Resend Activation Code",
          template: "activation-mail.ejs", // Assuming you have a template for activation mail
          data: { user: { email }, activationCode: activationToken.activationCode }
      };

      // Send activation mail
      await sendMail(mailData);

      // Send response
      res.status(200).json({
          success: true,
          message: `Activation code has been resent to ${email}`,
          activationToken: activationToken.token,
      });
  } catch (error: any) {
      next(new ErrorHandler(error.message || "Failed to resend activation code", 400));
  }
};


interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { name, email, phoneNumber , password, role, } = newUser.user;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      const user = await userModel.create({
        name,
        email,
        phoneNumber,
        password,
        role,
      });

      res.status(201).json({
        success: true,
        
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//forgot password verify otp
interface Iuser{
  email: string;
}

export const NewPass = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;
      

      const newUser: { user: Iuser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: Iuser; activationCode: string };
    

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
    
      const { email } = newUser.user;

      req.body.email = email;


      const existUser = await userModel.findOne({ email });

    
      if (!existUser) {
     
        return next(new ErrorHandler("Email not registered", 400));
        
      }
    

      res.status(201).json({
        success: true,
       
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
     
    }
  }
);


//frogot password new password
interface IUpdateNewPassword {
  newPassword: string;
  
}

export const updateNewPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newPassword } = req.body as IUpdateNewPassword;
      const { activation_token, activation_code } = req.body as IActivationRequest

      if (!activation_token) {
        return next(new ErrorHandler(`Activation token is required: ${activation_token}`, 400));
      }

      const decodedToken = jwt.verify(activation_token, process.env.ACTIVATION_SECRET as string) as {
        user: any; email: string 
};
      console.log('Decoded Token:', decodedToken);

      const  email  = decodedToken.user.email;
      console.log('Email:', email);


      const user = await userModel.findOne({ email });

      if (!user) {
        return next(new ErrorHandler(`Email not registered: ${email}`, 400));
      }

      user.password = newPassword;
      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// Login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('loginuser')
    try {
      
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
   console.log('',user)
      sendToken(user, 200, res);
    } catch (error: any) {

      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";
      redis.del(userId);
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Could not refresh token";
      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decoded.id as string);
         
      if (!session) {
        return next(
          new ErrorHandler("Please login for access this resources!", 400)
        );
      }
      
      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
      res.status(200).json({
        status: "success",
        accessToken,
      });
      // return next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {  
      const userId = req.user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
// for the teacher verification
export const getUserInformation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {  
      const { userID } = req.body;

      if (!userID) {
        return next(new ErrorHandler("User ID is required", 400));
      }

      const user = await userModel.findById(userID);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      
      // Return the user object as the response
      res.status(200).json({
        success: true,
        data: user
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

// social auth
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user info
interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;

      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (name && user) {
        user.name = name;
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user password
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await userModel.findById(req.user?._id).select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword;

      await user.save();

      await redis.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IUpdateProfilePicture {
  avatar: string;
}

// update profile picture
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfilePicture;

      const userId = req.user?._id;

      const user = await userModel.findById(userId).select("+password");

      if (avatar && user) {
        // if user have one avatar then call this if
        if (user?.avatar?.public_id) {
          // first delete the old image
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// update Background picture
interface IUpdateBackgroundPicture {
  bgPicture: string;
}

export const updateBackgroundPicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bgPicture } = req.body as IUpdateBackgroundPicture;

      const userId = req.user?._id;

      const user = await userModel.findById(userId).select("+password");

      if (bgPicture && user) {
        // if user have one avatar then call this if
        if (user?.bgPicture?.public_id) {
          // first delete the old image
          await cloudinary.v2.uploader.destroy(user?.bgPicture?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(bgPicture, {
            folder: "bgPicture",
          });
          user.bgPicture = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(bgPicture, {
            folder: "bgPicture",
          });
          user.bgPicture = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// About section 
interface IUpdateAbout {
  about?: string;
  userId: string;
}
export const updateAbout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
     try {
       const { userId ,about } = req.body as IUpdateAbout;

       

      //  const userId = req.user?._id;
       const user = await userModel.findById(userId);
 
       if (about && user) {
         user.about = about;
       }
 
       await user?.save();
 
       await redis.set(userId, JSON.stringify(user));
 
       res.status(200).json({
         success: true,
         user,
       });
     } catch (error: any) {
       return next(new ErrorHandler(error.message, 400));
     }
  }
 );
 


// get all users --- only for admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user role --- only for admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const isUserExist = await userModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserRoleService(res,id, role);
      } else {
        res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateUserRoleById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
     try {
       const { userId, role } = req.body;
       const isUserExist = await userModel.findById(userId);
       if (isUserExist) {
         updateUserRoleService(res, userId, role);
       } else {
         res.status(400).json({
           success: false,
           message: "User not found",
         });
       }
     } catch (error: any) {
       return next(new ErrorHandler(error.message, 400));
     }
  }
 );
 

// Delete user --- only for admin
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      await user.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
