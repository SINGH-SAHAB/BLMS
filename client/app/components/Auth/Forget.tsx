import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import * as Yup from "yup";
import { AiOutlineClose } from 'react-icons/ai';
import { styles } from '@/app/styles/style';
import { useActivationMutation, useLoginMutation, useRegisterMutation, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

// Define the props interface
interface Props {
  setRoute: (route: string) => void;
  refetch: any;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!")
});

const ForgetPasswordPage: React.FC<Props> = ({ setRoute }) => {
  const [message, setMessage] = useState<string>('');

  const [activation_code, { data }] = useActivationMutation();
  const [query, { isSuccess, error }] = useSocialAuthMutation();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      await query({ email });
    },
  });
  
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success("Login Successfully!");
      setRoute("Login");
    }
    if (!!isSuccess) {
      setMessage('Email not found in our database.');
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        alert('hello');
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
    
  

  return (
    <div className="w-full max-w-full h-auto overflow-y-auto justify-center items-center mt-[10%]">
        <div className="flex justify-end">
          <button onClick={() => setRoute("Login")} className="outline-none">
            <AiOutlineClose size={24} />
          </button>
        </div>
      <div style={{ textAlign: 'center' }}>
      <h2 className={`${styles.title} text-center`}>Forgot Password</h2>
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '50%', margin: '0 auto', height: 'auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email"  className={`${styles.label} text-center`}>Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              placeholder="Enter your email" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '0.5rem', textAlign: 'center' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit</button>
        </form>
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
