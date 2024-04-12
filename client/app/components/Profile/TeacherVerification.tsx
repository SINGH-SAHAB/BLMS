import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../../../app/styles/style";
import { toast } from "react-hot-toast";
import Protected from "../../hooks/useProtected";
import { useSelector } from "react-redux";
import { useVerificationNotificationMutation } from  "../../../redux/features/notifications/notificationsApi"

type Props = {
  onClose: () => void;
};
const TeacherVerification: FC<Props> = ({ onClose }) => {
  const { user } = useSelector((state: any) => state.auth);
  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    phoneNumber: Yup.string().required("Please enter your mobile number"),
  });

  const [verificationMutation] = useVerificationNotificationMutation(); // moved outside onSubmit
  // console.log([verificationMutation] )

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
         console.log(values.name.toLowerCase() === user.name.toLowerCase());
         console.log(values.email.toLowerCase() === user.email.toLowerCase());
         console.log(values.phoneNumber === user.phoneNumber);
         const phoneNumber = parseFloat(values.phoneNumber);
     
         // Compare form data with user data
         if (
           values.name.toLowerCase() === user.name.toLowerCase() &&
           values.email.toLowerCase() === user.email.toLowerCase() &&
           phoneNumber === user.phoneNumber
         ) {
           // Correctly pass the user._id to the mutation
           await verificationMutation({ userID: user._id }); // Pass the user ID in the expected format
     
           // Data matches, show success toast
           toast.success("Information submitted successfully");
           onClose(); // Close the form
         } else {
           // Data doesn't match, show error toast
           toast.error("Data does not match. Please check your inputs and try again.");
         }
      }  catch (error) {
        toast.error("Failed to submit information. Please try again.");
      }
    },
  });

  useEffect(() => {
    // Log user data to console
    console.log("User data:", user);
  }, [user]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Translucent overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg relative z-50">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className={`${styles.title} text-center mb-4`}>Teacher Verification</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className={`${styles.label}`} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter your name"
              className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
          </div>

          <div className="mb-3">
            <label className={`${styles.label}`} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
              className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label className={`${styles.label}`} htmlFor="phoneNumber">
              Mobile Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              id="phoneNumber"
              placeholder="Enter your mobile number"
              className={`${errors.phoneNumber && touched.phoneNumber && "border-red-500"} ${styles.input}`}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <span className="text-red-500 pt-2 block">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="flex justify-center">
            <button type="submit" className={`${styles.button}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherVerification;
