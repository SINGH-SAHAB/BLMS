import React, { useState, useRef, useEffect } from 'react';
import { FaUpload} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { CiLogout } from "react-icons/ci";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from 'next-auth/react';
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Avatar, Input } from '@mui/material';
import Image from 'next/image';
import avatarIcon from "../../../public/assests/avatar.png";
import bgPictureIcon from "../../../public/assests/bgPicture.jpg";
import TeacherVerification from './TeacherVerification';
import {useUpdateAboutMutation, useUpdateBgpictureMutation} from "@/redux/features/user/userApi";
import { MdDriveFolderUpload } from "react-icons/md";
import { IoIosCamera } from 'react-icons/io';
// import CourseCard from '../Course/CourseCard';
// import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
  user: any;

};

const ProfilePage: React.FC = (user) => {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { data: userData } = useLoadUserQuery(undefined, {});

  const [logout, setLogout] = useState(false);

  const [buttonMes, setButtonMessage] = useState<string | null>(null);
  const [boxContent, setBoxContent] = useState<JSX.Element | null>(null);

  const [updatebgPicture, { isSuccess, error }] = useUpdateBgpictureMutation();
  
  const [aboutText, setAboutText] = useState<string>('');

  const [updateAboutMutation] = useUpdateAboutMutation();
   const [courses, setCourses]=useState([]);
//  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined,{});
//  const [user, setUser] = useState({});
  
  
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const bgPicture = fileReader.result;
        updatebgPicture(bgPicture);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);  //check this ?????
  };


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setAboutText(e.target.value);
  }

  const handleButtonClick = (message: string) => {
    setButtonMessage(message);




    
    // Conditional setting of box content
    if (message === 'About') {
      setBoxContent(
        <div>
          <p>{userData?.user?.about}</p>
          <Button
            variant="outline-dark"
            onClick={() => setBoxContent(
              <div>
                <h2>Edit About</h2>
                <Input
                type='text'
                  // value='Text'
                   onChange={handleChange}
                  
                  // style={{ width: '100%' }}
                />
                <Button onClick={submitAbout}>Submit</Button>
              </div>
            )}
          >
            Edit About
          </Button>
        </div>
      );
    } 
    else if (message === 'Enrolled Course') {
      // Call your function related to enrolled courses here
      // const enrolledCoursesOutput = getEnrolledCourses(); // Replace getEnrolledCourses() with your actual function call
      setBoxContent(<div>Coming soon</div>);
    }
    else if (message === 'Edit Profile') {
      setBoxContent(<ProfileInfo avatar={userData.user.avatar} user={userData.user} />); // Replace with actual content
    }
    else if (message === 'Change Password') {
      setBoxContent(<ChangePassword />);
    }else if (message === 'Are you a instructor?') {
      setBoxContent(<TeacherVerification onClose={() => setBoxContent(null)} />);
    }
    else if(message=='wishlist'){
      setBoxContent(<div> Coming soon  </div>);
    }
    
  };

  const submitAbout = async () => {
    try {

      console.log('about',aboutText);
      // await updateAboutMutation({ userId: userData.user._id, about: aboutText });
      // Update UI or show success message upon successful update
      console.log('About updated successfully!');
    } catch (error) {
      // Handle error or show error message upon update failure
      console.error('Failed to update about:', error);
    }
  };

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };
  //console.log(`${user.courses}`);
  

  
  const userName = userData?.user?.name;
  const userEmail = userData?.user?.email;
  const userPhoneNumber = userData?.user?.phoneNumber;  // Assuming the field is named 'phone_number'
  const userAvatar = userData?.user?.avatar;
  const userbgPicture=userData?.user?.bgPicture;
  const userAbout=userData?.user?.about;
  // const userCourseId=userData?.user?.courses;
  //console.log(data.courses);
  // console.log("sfdsa****************",userData);
  // console.log("dfdsfsdf***************************************8",userCourseId);
  
  // useEffect(() => {
  //   if (data && user && data.courses) {
  //     const filteredCourses = data.courses
  //       .map((userCourse: any) =>
  //         data.courses.find((course : any ) => course._id === userCourse._id)
  //       )
  //       .filter((course: any) => course !== undefined);
  //     setCourses(filteredCourses);
  //   }
    
  // }, [data, data.courses]);
  
  // const getEnrolledCourses = () => {
  //   return (
  //     <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
  //       <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
  //         {courses &&
  //           courses.map((item: any, index: number) => (
  //             <CourseCard item={item} key={index} isProfile={true} />
  //           ))}
  //       </div>
  //       {courses.length === 0 && (
  //         <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
  //           You don't have any purchased courses!
  //         </h1>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
      {/* Background Image Upload Section */}
      <section 
        style={{ width: '100%', height: '220px',  padding: '2px', border: '1px #F9F9F9',  backgroundColor: '#4b4b4b', 
          backgroundImage: `url(${userData?.user?.bgPicture || userbgPicture ? userData?.user?.bgPicture.url || userbgPicture :  bgPictureIcon})`,
          backgroundSize:'cover',
          backgroundPosition: 'center',backgroundRepeat: 'no-repeat',position: 'relative',display: 'flex',flexDirection: 'column',
          alignItems: 'center',justifyContent: 'center',marginBottom:'-110px' }}>
           <input
            type="file"
            name=""
            id="bgPicture"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="bgPicture">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <IoIosCamera size={20} />
            </div>
          </label>
      {/* Section 2 & Section 3: Student Details and Buttons */}
        </section>
      
        {/* Section 2: Student Details */}
        <div style={{ width: '25%', marginLeft:'10%', marginRight:'75%', marginTop:'-55px',  border: '1px solid black', padding: '20px',zIndex: 2, backgroundColor: '#FFFFFF'}}>
        {/* Profile Pic Section */}
        {/* Profile Picture Section */}
        <div style={{ marginBottom: '20px', textAlign: 'center',marginLeft:'29%' }}>
          {/* <label htmlFor="profilePicInput" style={{ cursor: 'pointer' }}> */}
            {/* {profilePic ? ( */}
            <Image 
             src={userData?.user?.avatar || userAvatar ? userData?.user?.avatar.url || userAvatar : avatarIcon}
             alt=""
             width={120}
             height={120}
             className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
           />
  </div>

        {/* Student Details */}
        <div style={{ marginTop:'20%', color:'black' }}>
          <div>Name: {userName}</div>
          <div style={{marginTop:'5%'}}>Email: {userEmail}</div>
          <div style={{marginTop:'5%'}}>Phone no.: {userPhoneNumber}</div>
        </div>

        {/* Buttons */}
        <div>
        <Button variant="outline-light" className='hover: text-gray-800 hover:font-semibold' 
            style={{ width: '100%', marginBottom: '10px', marginTop:'20%',color:'black' }} onClick={() => handleButtonClick('Are you a instructor?')}>
            Are you a instructor?
          </Button>
        </div>
        <div>
          <Button 
            variant="outline-light" className='hover: text-gray-800 hover:font-semibold' 
            style={{ width: '100%', marginBottom: '10px', marginTop:'5%',color:'black' }} 
            onClick = {() => logOutHandler()}
          >
            <CiLogout size={30} style={{ marginLeft:'44%' }} /> 
            Log Out
          </Button>
        </div>
        </div>
        
        {/* Section 3: Buttons */}
        <div style={{ 
        width: '50%', 
        marginLeft:'15%',
        marginTop: '-20%',
        marginBottom:'30%',
        display: 'flex',
        //justifyContent: 'space-between',
      }}>
      <div style={{ marginLeft:'5%',marginRight:'5%'}}>
      <Button variant="outline-light" className='hover: text-gray-800 hover:font-semibold' style={{color:'black',backgroundColor:'white',border:'1px white'}} onClick={() => handleButtonClick('About')}>
        About</Button>
      </div>

      <div style={{marginRight:'5%' }}>
      <Button  variant="outline-light" className='hover: text-gray-800 hover:font-semibold'  style={{color:'black',backgroundColor:'white',border:'1px white'}} onClick={() => handleButtonClick('Enrolled Course')}>
        Enrolled Courses</Button>
      </div>

      <div style={{marginRight:'5%' }}>
        <Button variant="outline-light" className='hover: text-gray-800 hover:font-semibold' style={{color:'black',backgroundColor:'white',border:'1px white'}} onClick={() => handleButtonClick('Edit Profile')}>
            Edit Profile
          </Button>
      </div>
      <div style={{marginRight:'5%' }}>
        <Button variant="outline-light" className='hover: text-gray-800 hover:font-semibold' style={{color:'black',backgroundColor:'white',border:'1px white'}} onClick={() => handleButtonClick('Change Password')}>
            Change Password
          </Button>
      </div>
      <div style={{marginRight:'5%' }}>
        <Button variant="outline-light" className='hover: text-gray-800 hover:font-semibold' style={{color:'black',backgroundColor:'white',border:'1px white'}} onClick={() => handleButtonClick('wishlist')}>
            Wishlist
          </Button>
      </div>
      </div>
      
      {/* Box to display the content */}
      <div style={{ 
        width: '60%', 
        marginLeft:'25%',
        height:'530px',
        marginTop: '-28%',  // Adjust the margin as needed
        padding: '10px',
        marginBottom:'6%',
        //border: '1px solid black',
        backgroundColor: '#F9F9F9',  // Background color for the box
        textAlign: 'center',
        overflowY:'auto'
      }}>
        {boxContent}
      </div>
    </div>
    
  );
};

export default ProfilePage;
