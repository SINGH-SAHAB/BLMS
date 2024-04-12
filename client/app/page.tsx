"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";
import Home from "./components/Route/homelogin";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";




interface Props {}






const Page: FC<Props> = (props) => {
 
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  
//const { data } = useSession();
  const{ data:userData} = useLoadUserQuery(undefined,{});
  // State to store login status


  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useEffect(()=>{
      setIsLoggedIn(!!userData);
     // alert(!!userData);
    },[userData]);


  return (
    <div>
     {/* <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
  />*/}
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
  
      {/* Conditionally render either the Hero component or Home component */}
      {isLoggedIn ? (
          <>
            <Home /> 
            {/*<Courses />
            <Reviews />
      <FAQ />*/}
            {console.log("User is logged in")} {/* Log statement */}
          </>
          ) : (
          <>
            <Hero />
            {/*<Courses />*/}
            {console.log("User is not logged in")} {/* Log statement */}
          </>
        )}
        <Courses />
        <Reviews />
        <FAQ />

      {/* <Attendance /> */}
      
      {/* <Quiz/> */}
       <Footer />
    </div>
  );
};

export default Page;
