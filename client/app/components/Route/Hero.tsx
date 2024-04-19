
import React, { FC,useState, useEffect } from 'react';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaRegQuestionCircle, FaVideo } from "react-icons/fa";
import { IoMdContacts } from 'react-icons/io';
import { SiGoogleclassroom } from 'react-icons/si';
import { RiPlayList2Line } from 'react-icons/ri';
import { GiNotebook } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";

const Home:React.FC = () => {
  const [showImportedFile , setShowImportedFile] = useState<boolean>(false);
  
  return (
    <div style={pageStyle}>
      <hr style={dividerStyle} />
      {/* Dashboard Content */}
      <div style={mainContentStyle}>
      <div style={dashboardContentStyle}>
        {/* Slider */}
        <div style={sliderContainerStyle}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://img-c.udemycdn.com/notices/featured_carousel_slide/image/5bf6274c-4a57-42ce-93d6-9775b06730be.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://img-c.udemycdn.com/notices/featured_carousel_slide/image/9ea59bc2-bd61-463e-9ce9-7e71e8e586ae.jpg"
                alt="Secod slide"
              />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* Add more Carousel.Item components for additional slides */}
          </Carousel>
        </div>
        {/* Additional Content */}
        <div style={additionalContentStyle}>
          <div style={{ ...textContainerStyle, marginLeft: '50px' }}>
            <h5 style={headingStyle}>Crack EXAMS with Company Name</h5>
            <h5 style={{ marginTop: '10px' }}>Over 10 crore learners trust us for Service.</h5>
          </div>
          <div style={buttonContainerStyle}>
            <button style={leftButtonStyle}>Try learning for free</button>
            <button style={rightButtonStyle}>View subscription plan</button>
          </div>
        </div>
        
        {/* Separate Buttons in Two Rows */}
        <div style={separateButtonContainerStyle}>
          <div style={{ ...buttonRowStyle1, ...(window.innerWidth <= 500 && smallScreenStyle) }}>
          <Link href="../Liveclass" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
  
              <div >
                
                <FaVideo style={{ width: '50px',marginTop:'40px',marginLeft:'10px', height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                 
                  <h5>Live classes<br /> 
                  Details</h5>
                  {showImportedFile}
                </div>
              </div>
            </button>
          </Link>
          <Link href="../educator" style={{color: 'black', textDecoration: 'none'}}>
              <button style={buttonStyle} >
              <div >
              <IoMdContacts style={{ width: '50px',marginTop:'40px',marginLeft:'10px' ,height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Top <br />
                  educators Details</h5>
          
                </div>
              </div>
            </button>
          </Link>
          <Link href="../BatchDetails" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
              <div >
              <SiGoogleclassroom style={{ width: '50px',marginTop:'40px',marginLeft:'10px' ,height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Batches <br /> Details</h5>
                </div>
              </div>
            </button>
          </Link>
          <Link href="../CourseDetails" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
              <div >
              <FaBook style={{ width: '50px',marginTop:'40px',marginLeft:'10px' ,height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Courses <br /> Details </h5>
                </div>
              </div>
            </button>
          </Link>
          </div>
          <div style={buttonRowStyle2}>
          <Link href="../Playlist" style={{color: 'black', textDecoration: 'none'}}>
          <button style={buttonStyle}>
              <div>
              <RiPlayList2Line style={{ width: '50px',marginTop:'40px',marginLeft:'10px' ,height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Playlist  <br />Details</h5>
                </div>
              </div>
            </button>
          </Link>
          <Link href="../Practise" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
              <div>
              <GiNotebook style={{ width: '50px',marginTop:'40px',marginLeft:'10px', height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Practice <br />Details</h5>
                </div>
              </div>
            </button>
          </Link>
          <Link href="../testSeries" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
              <div >
              <MdQuiz style={{ width: '50px',marginTop:'40px',marginLeft:'10px', height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Test series <br />Details</h5>
                </div>
              </div>
            </button>
          </Link>
          <Link href="../Doubt&solution" style={{color: 'black', textDecoration: 'none'}}>
            <button style={buttonStyle}>
              <div>
              <FaRegQuestionCircle style={{ width: '50px',marginTop:'40px',marginLeft:'10px', height: '50px', position: 'absolute', top: '5px', left: '5px' }} />
                <div style={{ marginLeft: '70px' }}>
                  <h5>Doubt & solution <br />Details </h5>
                </div>
              </div>
            </button>
          </Link>
          </div>
        </div>
        <div style={boxStyle}>
          <div style={textSectionStyle}>
            <h3 style={headingStyle}>Visit the centre for a personalized experience</h3>
            <p>This is where your text content goes.</p>
            <button style={visitButtonStyle}>Visit the Center</button>
          </div>
          <div style={photoBoxStyle}>
            <img
            src="https://via.placeholder.com/400x400" alt="Random Photo" style={photoSectionStyle}
            />
          </div>
        </div>
        <div style={ScolarshipSection}>
          <div style={ScolarshiptextSectionStyle}>
            <h3 style={headingStyle}>Take a test for free and win up to 50% scholarship</h3>
            <p>This is where your text content goes.</p>
            <button style={ScolershipButtonStyle}>Attemt test now</button>
          </div>
          <div style={ScolarshipimageSectionStyle}>
              <img src="/path/to/image.png" alt="Image" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={ExtraSectionStyle}>
          <div style={ExtraTextSectionStyle}>
            <h3>New Section Heading</h3>
            <h4>Subheading 1</h4>
            <p>Content goes here...</p>
            <h4>Subheading 2</h4>
            <p>More content goes here...</p>
            <h4>Subheading 3</h4>
            <p>Even more content goes here...</p>
          </div>
          <div style={ExtraImgSectionStyle}>
            <img src="https://www.edx.org/cdn-cgi/image/width=undefined,height=undefined,format=webp,quality=75/images/koosh-brain.png" alt="Photo" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  backgroundColor: 'white',
  color: 'black',
  width: '100vw',
  height:'100vh',
  overflowX:'hidden',
};
const mainContentStyle: React.CSSProperties = {
  maxWidth: '100%', // Limit the maximum width of the main content
  margin: '0 auto', // Center the main content horizontally
   // Add padding to the main content
};

const dividerStyle: React.CSSProperties = {
  margin: '0',
  border: 'none',
  borderTop: '1px solid #ccc',
};

const dashboardContentStyle: React.CSSProperties = {
  padding: '10px',
  marginTop: '30px',
};

const sliderContainerStyle: React.CSSProperties = {
  width: '100%', // Limit slider width
  margin: 'auto', // Center slider horizontally
};

const additionalContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
};

const textContainerStyle: React.CSSProperties = {
  width: '50%', // Adjust width as needed
};

const headingStyle: React.CSSProperties = {
  margin: '0',
  color: '#3C4852',
  display: 'block',
  fontSize: 'clamp(32px, 3em, 48px)',
  lineHeight: 'clamp(40px, 1.2em, 56px)',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
};

const leftButtonStyle: React.CSSProperties = {
  backgroundColor: 'white',
  color: 'black',
  border: '2px solid black',
  borderRadius: '10px', // Adding border radius for rounded corners
  padding: '5px', // Adding padding for better appearance
  marginRight: '10%',
  marginLeft: '0%', // Adding margin between buttons
};

const rightButtonStyle: React.CSSProperties = {
  borderRadius: '10px', // Adding border radius for rounded corners
  padding: '20px 40px',
  marginRight: '5%',
  background: '#9ACDF7',
  border: '1px solid #08BD80',
  color: '#FFFFFF',
  marginLeft: '2%',
  // Adding padding for better appearance
};

const separateButtonContainerStyle: React.CSSProperties = {
  marginTop: '3%',
};
const smallScreenStyle: React.CSSProperties = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '20px',
  marginBottom: '20px',
};
const buttonRowStyle1: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2%',
  marginLeft:'6%',
  marginRight:'6%',
};
const buttonRowStyle2: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '3%',
  marginLeft:'6%',
  marginRight:'6%',
};
const buttonStyle: React.CSSProperties = {
  display:'inline-block',
  width:'200px',
  height:'150px',
  alignItems:'center',
  padding: '10px 20px',
  backgroundColor: '##fcfcfc',
  border: '1px solid #ccc',
  borderRadius: '8px',
  cursor: 'pointer',
  position: 'relative',
  gap: '4px',
  transition: 'all 0.5s',
};

const textSectionStyle: React.CSSProperties = {
  flex: '1',
  padding: '20px',
};

const photoSectionStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Maintain aspect ratio while covering the box
};

const boxStyle: React.CSSProperties = {
  borderRadius: '20px',
  height: '20%',
  display: 'flex',
  justifyContent: 'space-around',
  margin: '5% auto',
  width: '100%',
  padding: '1px 1px',
  backgroundColor: '#ffeed7',
};

const photoBoxStyle: React.CSSProperties = {
  borderRadius: '30px',
  marginTop: '2%',
  marginBottom:'2%',
  marginRight: '3%',
  width: '40%', // Adjust width as needed
  height: 'calc(100% - 40px)', // Make it full height of the box
  backgroundColor: 'white',
  overflow: 'hidden', // Ensure overflow content is hidden
};
const visitButtonStyle: React.CSSProperties = {
  padding: '14px 32px',
  marginTop: '300px',
  marginBottom:'50px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  background: 'rgb(59 71 81)',
  border: '1px solid rgb(60, 72, 82)',
  fontSize: '14px',
  color: 'rgb(255, 255, 255)',
  lineHeight: '20px',
  fontWeight: '700',
  minWidth: '100px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
  cursor: 'pointer',
  width: '200px',
};
const ScolarshipSection: React.CSSProperties = {
  width: 'var(--layout-width)',
  background: '#FCF8E9',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const ScolarshipimageSectionStyle: React.CSSProperties = {
  width: '190px',
  aspectRatio: 'auto 190 / 121',
  height: '121px',
};
const ScolarshiptextSectionStyle: React.CSSProperties = {
  flex: '1',
  padding: '20px',
};
const ScolershipButtonStyle: React.CSSProperties = {
  padding: '14px 32px',
  marginTop: '160px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  background: 'rgb(59 71 81)',
  border: '1px solid rgb(60, 72, 82)',
  fontSize: '14px',
  color: 'rgb(255, 255, 255)',
  lineHeight: '20px',
  fontWeight: '700',
  minWidth: '100px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
  cursor: 'pointer',
  width: '200px',
};
const ExtraSectionStyle: React.CSSProperties = {
  width: 'var(--layout-width)',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ExtraTextSectionStyle: React.CSSProperties = {
  flex: '1',
  padding: '20px',
};

const ExtraImgSectionStyle: React.CSSProperties = {
  width: '40%', // Adjust the width as needed
};

export default Home;
=======
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data,isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router = useRouter()
  
 
  
  // const handleSearch = () => {
  //  if(search === ""){
  //   return
  //  }else{
  //   router.push(`/courses?title=${search}`);
  //  }
  // }

  useEffect(() => {
    const handleEnterKeyPress = (e: { key: string; }) => {
      if (e.key === "Enter" && search.trim() !== "") {
        handleSearch();
      }
    };

    window.addEventListener("keydown", handleEnterKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [search]);

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${encodeURIComponent(search)}`);
    }
  };


  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={data?.layout?.banner?.image?.url }
         // src={require("../../../public/assests/banner-img-1.png")}
          width={400}
          height={400}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
        {/* <Image
            src={require("../../../public/assests/banner-img-1.png")}
            alt=""
            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"

            // className="rounded-full"
          /> */}
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
          {data?.layout?.banner?.title}
          {/* Improve your online learning experience better instantly */}

        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
         {data?.layout?.banner?.subTitle}
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
          onClick={handleSearch}
          >
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={require("../../../public/assests/client-1.jpg")}
            alt=""
            className="rounded-full"
          />
          <Image
            src={require("../../../public/assests/client-2.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={require("../../../public/assests/client-3.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>{" "}
          </p>
        </div>
        <br />
      </div>
    </div>
    )
   }
   </>
  );
};

export default Hero;

