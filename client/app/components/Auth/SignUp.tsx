"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub,AiOutlineClose,} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  // here i am ading some new usestate for the  Make Password Strength Indicator
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
     // alert ('error');
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const handleMobileNumberChange = (e: { target: { value: any } }) => {
    const phoneNumber = e.target.value;

    // Check if the entered number has more than 10 digits
    if (phoneNumber.length > 10) {
      alert("Mobile number cannot be greater than 10 digits");
    } else {
      // Update the state with the entered number
      setPhoneNumber(phoneNumber);
    }
  };
  const checkPasswordStrength = (password: string | any[]) => {
    let strength = 0;

    if (password.length <= 6) {
      strength = 1;
    } else if (password.length <= 8) {
      strength = 2;
    } else {
      strength = 3;
    }

    setPasswordStrength(strength);
  };
  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfirmPassword(value);
    handleChange(e); 
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: " ",
      password: "",
      confirmPassword: "",
      role: "student",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, phoneNumber, password, role }) => {
      const data = {name, email, phoneNumber, password, role,};
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  function setOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    
    <div className="w-full h-[650px] flex flex-col justify-center items-center overflow-hidden">
      
      <div className=" absolute top-0 right-0 m-4 outline-none">
        <button onClick={() => setRoute("Login")} className="outline-none">
          <AiOutlineClose size={24} />
        </button>
      </div>
      <h1 className={`${styles.title} text-center`}>Join to ELearning</h1>
      <div className="max-w-full overflow-y-auto" >
      <form onSubmit={handleSubmit} className="mt-2 px-4 overflow-y-auto">
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="johndoe"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Mobile number
          </label>
          <input
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={(e) => {
              handleChange(e);
              handleMobileNumberChange(e);
            }}
            id="number"
            placeholder="Enter your Number"
            // max={10} // Set max value to 10 digits
            className={`${
              errors.phoneNumber && touched.phoneNumber && "border-red-500"
            } ${styles.input}`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">
              {errors.phoneNumber}
            </span>
          )}
        </div>

        {/* <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="role">
            Select your role
          </label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            id="role"
            className={`${errors.role && touched.role && "border-red-500"} ${
              styles.input
            }`}
          >
            <option value="" disabled className={`${styles.select}`}>
              Select your role
            </option>
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && touched.role && (
            <span className="text-red-500 pt-2 block">{errors.role}</span>
          )}
        </div> */}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={(e) => {
              handleChange(e);
              checkPasswordStrength(e.target.value);
            }}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>

        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
         <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            id="confirmPassword"
            placeholder="Confirm your password"
            className={`${
              errors.confirmPassword && touched.confirmPassword && "border-red-500"
            } ${styles.input}`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
          )}
        </div>
        {/* Password Strength Indicator */}
        {values.password && (
          <div className="mt-2">
            <div className="bg-gray-200 h-2 rounded">
              <div
                className={`${
                  passwordStrength === 1
                    ? "bg-red-500"
                    : passwordStrength === 2
                    ? "bg-orange-500"
                    : "bg-green-500"
                } h-2 rounded`}
                style={{ width: `${(passwordStrength / 3) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1">
              Password Strength:{" "}
              {passwordStrength === 1
                ? "Weak"
                : passwordStrength === 2
                ? "Medium"
                : "Strong"}
            </p>
          </div>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        
      </form>
      </div>
      <div className=" w-full flex flex-col items-center justify-center">
        {/* <h5 className="text-center font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-2">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div> */}
        <h5 className="text-center font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Signup;