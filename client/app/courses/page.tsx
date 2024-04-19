"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    } else {
      setCourses(data?.courses.filter((item: any) => item.categories === category));
    }

    if (search) {
      setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [data, category, search]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat: string) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const clearFilters = () => {
    setCategory("All");
    setSelectedCategories([]);
  };

  return (
    <div>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <div style={{ borderTop: "1px solid #ccc" }}></div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "20%",
            backgroundColor: "#e0e0e0",
            padding: "20px",
          }}
        >
          <Heading title={"Filter"} description={""} keywords={""} />
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                padding: "5px 10px",
                backgroundColor: category === "All" ? "#5050cb" : "transparent",
                color: category === "All" ? "white" : "black",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => setCategory("All")}
            >
              All
            </div>
            {categoriesData?.layout?.categories.map((item: any, index: number) => {
              if (item.title !== "All") {
                return (
                  <div
                    key={index}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: category === item.title ? "#5050cb" : "transparent",
                      color: category === item.title ? "white" : "black",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </div>
                );
              }
            })}
          </div>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
        <div style={{ width: "80%", paddingLeft: "20px" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <div className="course-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {courses && courses.length === 0 && (
                  <p>No courses found!</p>
                )}
                {courses && courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
              </div>
            </Suspense>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
