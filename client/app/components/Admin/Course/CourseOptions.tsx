import React, { FC } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
    onDelete: (index: number) => void; // Function to handle deletion of a course
}

const CourseOptions: FC<Props> = ({ active, setActive, onDelete }) => {
    const options: string[] = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];

    const isOptionActive = (index: number): boolean => {
        return active + 1 > index;
    };

    return (
        <div>
            {options.map((option: string, index: number) => (
                <div key={index} className="w-full flex py-5">
                    <div
                        className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
                            isOptionActive(index) ? "bg-blue-500" : "bg-[#384766]"
                        } relative`}
                    >
                        <IoMdCheckmark className="text-[25px]" />
                        {index !== options.length - 1 && (
                            <div
                                className={`absolute h-[30px] w-1 ${
                                    isOptionActive(index) ? "bg-blue-500" : "bg-[#384766]"
                                } bottom-[-100%]`}
                            />
                        )}
                    </div>
                    <h5
                        className={`pl-3 ${
                            active === index ? "dark:text-white text-black" : "dark:text-white text-black"
                        } text-[20px]`}
                    >
                        {option}
                    </h5>
                    {/* {index !== options.length - 1 && (
                        <button
                            className="ml-2 flex items-center justify-center rounded-full bg-red-500 text-white w-8 h-8"
                            onClick={() => onDelete(index)} // Call onDelete function with index
                        >
                            <IoMdClose className="text-[20px]" />
                        </button>
                    )} */}
                </div>
            ))}
        </div>
    );
}

export default CourseOptions;
