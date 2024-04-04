/*
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
*/

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

// pages/courses.tsx

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useRef, useState } from "react";
import CourseCard from "../Course/CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setCourses(data?.courses || []);
    }
  }, [data]);

  const handleLeftButtonClick = () => {
    setVisibleIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightButtonClick = () => {
    setVisibleIndex((prevIndex) => Math.min(prevIndex + 1, (courses?.length || 0) - 3));
  };

  const theme = 'dark'; // Replace 'dark' with your theme detection logic

  return (
    <div className="courses-container">
      <button
        className={`scroll-button left-button ${theme === 'dark' ? 'dark' : 'light'}`}
        onClick={handleLeftButtonClick}
        disabled={visibleIndex === 0}
      >
        {"<"}
      </button>
      <div className="courses-list" ref={containerRef}>
        {courses && courses.map((item: any, index: number) => (
          index >= visibleIndex && index < visibleIndex + 3 ? (
            <CourseCard item={item} key={index} />
          ) : null
        ))}
      </div>
      <button
        className={`scroll-button right-button ${theme === 'dark' ? 'dark' : 'light'}`}
        onClick={handleRightButtonClick}
        disabled={visibleIndex >= (courses?.length || 0) - 3}
      >
        {">"}
      </button>

      <style jsx>{`
        .courses-container {
          position: relative;
          margin-top: 20px;
        }

        .courses-list {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 10px; /* Add some space at the bottom for the scrollbar */
        }

        .courses-list > * {
          width: 50px;
          height: 50px;
          margin-right: 20px;
        }

        .scroll-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: transparent;
          border: none;
          font-size: 24px;
          color: ${theme === 'dark' ? '#fff' : '#000'};
          cursor: pointer;
          z-index: 1;
          transition: background-color 0.3s ease;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-button:hover {
          background-color: ${theme === 'dark' ? '#333' : '#f0f0f0'};
        }

        .left-button {
          left: 10px;
        }

        .right-button {
          right: 10px;
        }

        .dark {
          background-color: #333;
        }

        .light {
          background-color: #f0f0f0;
        }

        @media (max-width: 768px) {
          .courses-list > * {
            width: calc(100vw - 40px);
          }
        }
      `}</style>
    </div>
  );
};

export default Courses;
