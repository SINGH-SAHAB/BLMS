"use client";
import { ReactNode, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiBookmark, CiSquareQuestion } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { TbTriangleSquareCircle, TbUserQuestion } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";
import { IoRocketOutline, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const TeacherDashboard: React.FC = () => {
  const router = useRouter();
  const [sectionContent, setSectionContent] = useState();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (e: any) => {
    setSectionContent(e);
    setActiveButton(e);
    // router.push(`${e}`);
  };

  const getButtonClass = (e: string) => {
    return activeButton === e
      ? "bg-blue-900 text-white"
      : "bg-white text-indigo-900";
  };

  const applyButtonStyles = () => {
    return "hover:bg-blue-700 flex items-center rounded text-2xl h-16 m-2";
  };

  return (
    <div className="w-full flex flex-col bg-gray-200">
      {/* section 1 */}
      <section className="flex flex-1 flex-col md:flex-row justify-center md:justify-between border border-blue-700 rounded p-3 m-2">
        <div className="justify-between border rounded font-semibold text-xl bg-white text-indigo-900">
          <Image
            src="/image/profile.png"
            alt="Profile"
            className="w-23 h-23 rounded-full mr-3 ml-auto"
            width={100}
            height={100}
          />
        </div>

        <div className="flex-col justify-between border rounded p-3 m-2 text-indigo-900 bg-white">
          <h2 className="font-semibold py-2 text-xl">Teacher Name:</h2>
          <p className="font-semibold py-2 text-xl">Rating: 4.5</p>
          <p className="font-semibold py-2 text-xl">
            Some description about the teacher...
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between font-semibold rounded px-2 items-center">
          <button
            onClick={() => handleButtonClick("/")}
            className={`hover:bg-blue-700 rounded mb-2 md:mb-0 md:mr-2 w-48 h-1/3 ${getButtonClass(
              "/"
            )}`}
          >
            Create your own Quiz
          </button>
          {/* <button onClick={() => router.push("/")} className={`hover:bg-blue-500 border border-blue-500 rounded w-48 h-1/3 ${getButtonClass('./course')}`}> */}
          <button
            onClick={() => handleButtonClick("/hello")}
            className={`hover:bg-blue-700 rounded w-48 h-1/3 ${getButtonClass(
              "/hello"
            )}`}
          >
            Create your own Courses
          </button>
        </div>
      </section>

      <hr className="mx-3 h-1 bg-blue-800" />

      <div className="m-3 flex border border-blue-700">
        {/* section 2 */}
        <section className="hidden md:flex w-1/5 flex-col justify-center border border-blue-700 p-3 text-blue-500 ">
          <button
            className={`${applyButtonStyles()} ${getButtonClass("Dashboard")}`}
            onClick={() => handleButtonClick("Dashboard")}
          >
            <MdDashboard className="mx-3" /> Dashboard
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass("./profile")}`}
            onClick={() => handleButtonClick("./profile")}
          >
            <CgProfile className="mx-3" /> My Profile
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Enrolled Courses"
            )}`}
            onClick={() => handleButtonClick("Enrolled Courses")}
          >
            <MdLibraryBooks className="mx-3" /> Enrolled Courses
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass("Wishlist")}`}
            onClick={() => handleButtonClick("Wishlist")}
          >
            <CiBookmark className="mx-3" /> Wishlist
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass("Reviews")}`}
            onClick={() => handleButtonClick("Reviews")}
          >
            <FaRegStar className="mx-3" /> Reviews
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "My Quiz Attempts"
            )}`}
            onClick={() => handleButtonClick("My Quiz Attempts")}
          >
            <TbTriangleSquareCircle className="mx-3" /> Quiz Attempts
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Order History"
            )}`}
            onClick={() => handleButtonClick("Order History")}
          >
            <BsCart2 className="mx-3" /> Order History
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Question AND Answer"
            )}`}
            onClick={() => handleButtonClick("Question AND Answer")}
          >
            <TbUserQuestion className="mx-3" /> Q & A
          </button>

          <hr className="h-1 bg-blue-900 my-4" />

          <p className="text-center text-3xl font-bold text-indigo-900">
            Instructor
          </p>

          <hr className="h-1 bg-blue-900 my-4" />

          <button
            className={`${applyButtonStyles()} ${getButtonClass("My Courses")}`}
            onClick={() => handleButtonClick("My Courses")}
          >
            <IoRocketOutline className="mx-3" /> My Courses
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Announcements"
            )}`}
            onClick={() => handleButtonClick("Announcements")}
          >
            <HiOutlineSpeakerphone className="mx-3" /> Announcements
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Withdrawals"
            )}`}
            onClick={() => handleButtonClick("Withdrawals")}
          >
            <LuWallet className="mx-3" /> Withdrawals
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass(
              "Quiz Attempts"
            )}`}
            onClick={() => handleButtonClick("Quiz Attempts")}
          >
            <CiSquareQuestion className="mx-3" /> Quiz Attempts
          </button>

          <hr className="h-1 bg-blue-900 my-4" />

          <button
            className={`${applyButtonStyles()} ${getButtonClass("Setting")}`}
            onClick={() => handleButtonClick("Setting")}
          >
            <IoSettingsOutline className="mx-3" /> Setting
          </button>

          <button
            className={`${applyButtonStyles()} ${getButtonClass("Log Out")}`}
            onClick={() => handleButtonClick("Log Out")}
          >
            <IoIosLogOut className="mx-3" /> Log Out
          </button>
        </section>

        {/* section 3 */}
        <section className="p-5 border border-blue-700 w-full ">
          {/* {sectionContent && (
              router.push(`${sectionContent}`)
            )} */}
          {sectionContent}
        </section>
      </div>
    </div>
  );
};
export default TeacherDashboard;
