import { useGetCourseContentQuery, useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string; //course id
  user:any;
};

const CourseContent = ({ id ,user}: Props) => {
  const { data: contentData, isLoading,refetch } = useGetCourseDetailsQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  //console.log('*****xxxxxx*****',id)
  const data = contentData?.course?.sections;

  const [activeVideo, setActiveVideo] = useState(0);

console.log('*****akashs*****',contentData?.course?.sections?.pdf?.file_url)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
