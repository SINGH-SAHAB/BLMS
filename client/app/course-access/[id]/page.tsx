 'use client'
import CourseContent from "@/app/components/Course/CourseContent";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

//console.log('****fffff****',data)
type Props = {
    params:any;
}

const Page = ({params}: Props) => {
    const id = params.id;
  const { isLoading, error, data,refetch } = useLoadUserQuery(undefined, {});
// console.log('&**&',id)
// console.log('****hello****',data?.user)
//console.log('****fgfjkgcfff****',data)
  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error, id]);
  //console.log('****fffff****',data?.user)

  return (
   <>
   {
    isLoading ? (
        <Loader />
    ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
          <Footer />

        </div>
    )
   }
   </>
  )
}

export default Page

