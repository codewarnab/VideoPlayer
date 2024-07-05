import React, { Fragment, useEffect, useState } from "react";
import {

  LockClosedIcon
} from "@heroicons/react/outline";
import axios from 'axios';
//import { Link, useParams } from "react-router-dom";
import Review from "../Comment/Review";
import CardVideo from "./CardVideo";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [data, setData] = useState(null); // all heading of separate video
  const [list, setList] = useState(""); //main heading of list
  const [video, setVideo] = useState(props.lecId);
  const [title, setTitle] = useState(props.courseName);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // AIzaSyDbYK0Ag14Hq2En0PhG32o4ksktsuEgBLk

  // AIzaSyBMPqrF - TWzQnaE0DaSZ2y5SR4Ns - Bbb2E

  //AIzaSyD_7CuoqcIIOqeabeG3c27W3yfzwRxmHVs

  const handleVideoClick = () => {


    if (!token) {
      navigate("/signin");
    }
  };

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLockIconHover = () => {
    setShowErrorMessage(true);
  };

  const handleLockIconLeave = () => {
    setShowErrorMessage(false);
  };


  // const { coursename } = useParams();
  const course = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${props?.listId}&part=snippet&maxResults=50&key=AIzaSyBMPqrF - TWzQnaE0DaSZ2y5SR4Ns - Bbb2E`
        // `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.listId}&key=AIzaSyDbYK0Ag14Hq2En0PhG32o4ksktsuEgBLk`
      );



      const playlistData = {

        videos: res?.data?.items?.map(item => ({
          title: item?.snippet?.title,
          videoId: item?.snippet?.resourceId?.videoId
        }))
      };

      const videosWithViewCount = await Promise.all(
        playlistData?.videos?.map(async video => {
          const videoStatsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${video?.videoId}&part=statistics&key=AIzaSyBMPqrF - TWzQnaE0DaSZ2y5SR4Ns - Bbb2E`
          );
          const firstItem = videoStatsResponse?.data?.items[0];
          if (firstItem && firstItem?.statistics && firstItem?.statistics?.viewCount) {
            const viewCount = firstItem?.statistics?.viewCount;
            return {
              ...video,
              viewCount
            };
          } else {
            // Handle case where statistics are not available
            return {
              ...video,
              viewCount: 0 // Or any default value you prefer
            };
          }
        })
      );
      // const json = await res.data;
      // console.log(json.items);
      // setData(json.items);
      setData({ ...playlistData, videos: videosWithViewCount });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    course();
  }, [props?.listId])
  //console.log(data)
  const playlistname = async () => {
    try {
      const res = await axios.get(
        // `https://www.googleapis.com/youtube/v3/videos?id=${video}&key=AIzaSyDbYK0Ag14Hq2En0PhG32o4ksktsuEgBLk&part=snippet, contentDetails, statistics, status`
        `https://www.googleapis.com/youtube/v3/playlists?id=${props?.listId}&part=snippet&key=AIzaSyBMPqrF - TWzQnaE0DaSZ2y5SR4Ns - Bbb2E`
      );
      const json = await res?.data;
      // console.log(json)
      // json.items.map((item) => {
      //   console.log(item);
      // })
      // console.log(json.items);
      setList(json?.items[0]?.snippet?.title);
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {

    playlistname();
    //eslint-disable-next-line
  }, []);

  const handleClick = (item) => {
    setTitle((crr) => (crr = item?.title));
    setVideo((crr) => (crr = item?.videoId));
    setShowErrorMessage(true);
  };
  //console.log(video);
  return (
    <Fragment>

      <div className="grid grid-cols-2 bg-slate-950 items-center">
        <div className="bg-sky-50 rounded-r-[3rem] my-2  py-5">
          <h1 className="text-3xl mb-3">{list}</h1>
          <div className="overflow-scroll  overflow-x-hidden px-10" style={{ direction: "rtl" }}>
            <div className="flex flex-col gap-4 h-[30rem] " style={{ direction: "ltr" }}>
              {data &&
                data?.videos?.map((item) => {
                  return (
                    <div
                      className="flex cursor-pointer justify-between rounded-xl gap-1 hover:text-white hover:shadow-sky-200 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r from-indigo-500 to-blue-700 p-2 transition-all duration-500"
                      style={{ border: "1px solid gray" }}
                      onClick={() => handleClick(item)}
                      key={item?.id}>
                      <div className="flex w-full justify-between ">
                        <h2>{item?.title}</h2>

                        <p className="flex gap-3"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                        </svg>
                          View Count: {item?.viewCount}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {(!user?.employeeId && props?.role && props?.role[0]?.rolename === "Employee") ? (
          <div onClick={handleVideoClick} className="locked-content" style={{ marginLeft: "110px", width: "450px", opacity: showErrorMessage ? '0.8' : '1' }}>
            <LockClosedIcon className="lock-icon"
              onMouseEnter={handleLockIconHover}
              onMouseLeave={handleLockIconLeave}
            />
            {showErrorMessage && (
              <div className="lock-message error-message">
                You don't have access. Please contact the help desk.
              </div>
            )}
          </div>) : (
          <div className="bg-slate-950 h-full p-4">
            <div className="h-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={"https://www.youtube-nocookie.com/embed/" + video}
                title="Ecommerce Website Development Tutorial With MERN Stack, Razorpay, Redux, MUI &amp; Tailwind | Hindi"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        )}

        {/* <CardVideo video={video} role={props?.role[0]?.rolename} title={title} /> */}
        {/* <Link to="/feedback" class="bg-blue-500 py-4 hover:bg-blue-700 text-white font-bold px-4 rounded">
          Drop Your Review
        </Link> */}


      </div>
      <Review id={props?.id} setRie={props?.setRie} />

    </Fragment>
  );
};

export default Card;
