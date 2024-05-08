import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};
const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("https://localhost:8000/api/v1/getYouTubeOTP", {
        // .post("http://localhost:8000/api/v1/getYouTubeOTP", {

        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
//console.log('&&&&',videoUrl)
function getYouTubeVideoId(videoUrl: string) {
  // Regular expression to match YouTube video ID
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  
  // Execute the regular expression and get the video ID
  const match = videoUrl.match(regex);

  // // If there's a match, return the video ID
  if (match && match[1]) {
    return match[1];
  }
  // else 
  // return "coming soon";
  // if (match && match[1] !== null) {
  //   // If there's a match, return the video ID
  //   return match[1];
  // } else {
  //   // If there's no match, return "coming soon"
  //   return "coming soon";
  // }
  

  // If no match found, return null
  return null;
}

const YTvideoUrl = "https://www.youtube.com/watch?v=gN-uXX48kMw&ab_channel=Thetrendingmind";
const YTvideoId = getYouTubeVideoId(videoUrl);
//console.log('***',YTvideoId); // Output will be YOUR_VIDEO_ID

//const videoId = "qyYAOty_bDs";
  return (
    <div style={{position:"relative",paddingTop:"52.6%",overflow:"hidden"}}>
      <iframe
      style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
      // width="640"
      // height="360"
      src={`https://www.youtube.com/embed/${YTvideoId}`}
      title="All Functional MERN Stack LMS / Learning Management system series with next 13, TypeScript | Part 2"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default CoursePlayer;

