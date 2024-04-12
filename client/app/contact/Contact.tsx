// import React, { useState } from "react";
// import { styles } from "../styles/style";
// // import { GoogleMap, LoadScript } from "react-google-maps-api";

// // const MapContainer = () => {
// //     const mapStyles = {
// //       height: "50vh",  // Set the height of the map container
// //       width: "100%",   // Set the width of the map container
// //     };

// //     return (
// //       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
// //         <GoogleMap
// //           mapContainerStyle={mapStyles}
// //           zoom={15}
// //           center={{ lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }}  // Replace with your desired coordinates
// //         />
// //       </LoadScript>
// //     );
// //   };

// const contact = () => {

//   const [mobileNumber, setMobileNumber] = useState("");

//   const handleMobileNumberChange = (e: { target: { value: any; }; }) => {
//     const enteredNumber = e.target.value;

//     // Check if the entered number has more than 10 digits
//     if (enteredNumber.length > 10) {
//       alert("Mobile number cannot be greater than 10 digits");
//     } else {
//       // Update the state with the entered number
//       setMobileNumber(enteredNumber);
//     }
//   return (
//     <div className="text-black dark:text-white ">
//       <br />
//       <h1 className={`${styles.title} 800px:!text-[45px]`}>
//         Contact <span className="text-gradient">us</span>
//       </h1>
//       <div className="m-[10%] mt-[1%] w-[80%] pt-[.4%] p-[5%] border 10px  ">
//         <h1 className={`${styles.title}`}>Join to ELearning</h1>
//         <form
//         //   onSubmit={}
//         >
//           <div className="mb-3">
//             <label className={`${styles.label}`} htmlFor="email">
//               Enter your Name
//             </label>
//             <input
//               type="text"
//               name=""
//               // value={}
//               // onChange={}
//               id="name"
//               placeholder="johndoe"
//               className={` ${styles.input}`}
//             />
//           </div>
//           <div className="mb-3">
//             <label className={`${styles.label}`} htmlFor="email">
//               Enter your Email
//             </label>
//             <input
//               type="email"
//               name=""
//               //   value={values.email}
//               //   onChange={handleChange}
//               id="email"
//               placeholder="loginmail@gmail.com"
//               className={` ${styles.input}`}
//             />
//             {/* {errors.email && touched.email && (
//           <span className="text-red-500 pt-2 block">{errors.email}</span>
//         )} */}
//           </div>

//           <div className="mb-3">
//       <label className={`${styles.label}`} htmlFor="mobile">
//         Enter your Mobile Number
//       </label>
//       <input
//         type="number"
//         name="mobile"
//         value={mobileNumber}
//         onChange={handleMobileNumberChange}
//         id="mobile"
//         placeholder="Enter your Mobile Number"
//         className={` ${styles.input}`}
//         max={9999999999} // Set max value to 10 digits
//       />
//     </div>

//           <div className="mb-3">
//             <label className={`${styles.label}`} htmlFor="message">
//               Enter your message
//             </label>
//             <textarea
//               name="message"
//               // value={}
//               // onChange={}
//               id="message"
//               rows={8}
//               cols={30}
//               placeholder="Write your message here..."
//               className={`${styles.input} !h-min py-2`}
//             />
//           </div>

//           <div className="w-[200px]  flex justify-center items-center mt-5">
//             <input
//               type="submit"
//               value=" submit"
//               className={`${styles.button}`}
//             />
//           </div>
//           <br />
//         </form>
//         <br />
//       </div>
//     </div>
//   );
// };

// export default contact;

import React, { useState } from "react";
import { styles } from "../styles/style";
import Link from "next/link";

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredNumber = e.target.value;
    if (enteredNumber.length > 10) {
      alert("Mobile number cannot be greater than 10 digits");
    } else {
      setMobileNumber(enteredNumber);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !email || !mobileNumber || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Submit the form
    console.log("Form submitted!");
    // Clear form fields
    setName("");
    setEmail("");
    setMobileNumber("");
    setMessage("");
  };

  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        Contact <span className="text-gradient">us</span>
      </h1>
      <div className="border 10px grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[5px] 1500px:gap-[5px] mb-12">
        <div className="w-full m-[1%] pt-[4%] p-[5%] border 10px ">
          <div>
            <h1 className={`${styles.title} 800px:!text-[45px]`}>
              Contact <span className="text-gradient">Info</span>
            </h1>

            <h1 className={`text-black dark:text-white font-[500] font-Poppins text-center py-1 text-[20px] 800px:!text-[25px]`}>
              E<span className="text-gradient">learning</span>
            </h1>

            <p className="text-[20px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Call Us: 1-885-665-2022
            </p>

            <p className="text-[20px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Address: +7011 Vermont Ave, Los Angeles, CA 90044
            </p>

            <p className="text-[20px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Mail Us: hello@elearning.com
            </p>
            <br />
          </div>
        </div>

        <div className="w-full m-[1%] pt-[4%] p-[5%] border 10px ">
          <h1 className={`${styles.title}`}>Join ELearning</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className={`${styles.label}`} htmlFor="name">
                Enter your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="johndoe"
                className={`${styles.input}`}
                required
              />
            </div>
            <div className="mb-3">
              <label className={`${styles.label}`} htmlFor="email">
                Enter your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="loginmail@gmail.com"
                className={`${styles.input}`}
                required
              />
            </div>

            <div className="mb-3">
              <label className={`${styles.label}`} htmlFor="mobile">
                Enter your Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="mobile"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                id="mobile"
                placeholder="Enter your Mobile Number"
                className={`${styles.input}`}
                max={9999999999} // Set max value to 10 digits
                required
              />
            </div>

            <div className="mb-3">
              <label className={`${styles.label}`} htmlFor="message">
                Enter your message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={handleMessageChange}
                rows={4}
                cols={30}
                placeholder="Write your message here..."
                className={`${styles.input} !h-min py-2`}
                required
              />
            </div>

            <div className="w-[200px] flex justify-center items-center mt-5">
              <input type="submit" value="Submit" className={`${styles.button}`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
