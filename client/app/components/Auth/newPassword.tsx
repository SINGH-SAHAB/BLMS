import { styles } from "@/app/styles/style";
import { useNewPasswordMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

const NewPassword: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateNewPassword, { isSuccess, error }] = useNewPasswordMutation();

  const passwordChangeHandler = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updateNewPassword({
        activation_token: token,
        newPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={() => setRoute("Login")} className="outline-none">
          <AiOutlineClose size={24} />
        </button>
      </div>
      <h1 className={`${styles.title}`}>Set New Password</h1>
      <div className="w-full">
        <form className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label htmlFor="newPassword" className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              id="newPassword"
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label htmlFor="confirmPassword" className="block pb-2 text-black dark:text-[#fff]">
              Confirm your new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button className={`${styles.button}`} onClick={passwordChangeHandler}>
              Set New Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
