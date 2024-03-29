import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
};

const TestField: FC<Props> = ({
  active,
  setActive,
  handleSubmit: handlleTestQuestionSubmit,
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
    handlleCourseSubmit();
  };
  return (
    <>
      <div className="w-[80%] m-auto mt-24 p-3">
        TestField
        <div className="w-full flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => prevButton()}
          >
            Prev
          </div>
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default TestField;

function setActive(arg0: number) {
  throw new Error("Function not implemented.");
}
function handlleCourseSubmit() {
  throw new Error("Function not implemented.");
}
