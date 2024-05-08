import React, { FC, useState } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assests/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { VscNotebook } from "react-icons/vsc";
import TeacherVerification from "./TeacherVerification";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const [showTeacherVerification, setShowTeacherVerification] = useState(false);

  const toggleTeacherVerification = () => {
    setShowTeacherVerification((prev) => !prev);
  };

  const handleTeacherVerificationClick = () => {
    toggleTeacherVerification();
  };



  // const handleTeacherVerificationClick = () => {
  //   setShowTeacherVerification(true);
  // };

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="">
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
            onClick={() => setActive(1)}
          >
            <Image
              src={
                user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
              }
              alt=""
              width={20}
              height={20}
              className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
            />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
              My Account
            </h5>
          </div>
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
            onClick={() => setActive(2)}
          >
            <RiLockPasswordLine
              size={20}
              className="dark:text-white text-black"
            />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
              Change Password
            </h5>
          </div>
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
            onClick={() => setActive(3)}
          >
            <SiCoursera size={20} className="dark:text-white text-black" />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
              Enrolled Courses
            </h5>
          </div>
          {user.role === "teacher" && (
            <Link
              href="/admin/create-course"
              passHref
              className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
              }`}
            >
              <div className="flex items-center">
                <VscNotebook
                  size={20}
                  className="dark:text-white text-black"
                />
                <h5 className="pl-2 font-Poppins dark:text-white text-black">
                  Create Course
                </h5>
              </div>
            </Link>
          )}
          {user.role === "admin" && (
            <Link
              href="/admin"
              passHref
              className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
              }`}
            >
              <div>
                <MdOutlineAdminPanelSettings
                  size={20}
                  className="dark:text-white text-black"
                />
                <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                  Admin Dashboard
                </h5>
              </div>
            </Link>
          )}
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
            onClick={() => logOutHandler()}
          >
            <AiOutlineLogout size={20} className="dark:text-white text-black" />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
              Log Out
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-16 h-full">
        <div className="text-center mt-16 h-full">
          {user.role === "student" && (
            <p
              className="text-gray-500 text-sm mt-16 cursor-pointer hover: text-gray-800 hover:font-semibold"
              onClick={toggleTeacherVerification}
            >
              Are you a teacher?
            </p>
          )}
        </div>
      </div>
      {/* Teacher Verification Modal */}
      {showTeacherVerification && (
        <TeacherVerification onClose={toggleTeacherVerification} />
      )}
    </div>
  );
};

export default SideBarProfile;
