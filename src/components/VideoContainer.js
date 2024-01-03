import React, { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { YOUTUBE_API } from "../utils/constant";
import { Link } from "react-router-dom";
import { addVideoList } from "../utils/videoSlice";
import { useDispatch, useSelector } from "react-redux";
export const VideoContainer = () => {
  const dispatch = useDispatch();
  const videoList = useSelector((store) => store.video.videoList);
  console.log(videoList);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const JSON = await data.json();
    dispatch(addVideoList(JSON.items));
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {videoList?.map((video) => {
        const videoId =
          typeof video?.id === "object" ? video?.id?.videoId : video?.id;
        return (
          <div key={videoId}>
            <Link to={"/watch?v=" + video.id}>
              <VideoCard key={videoId} info={video} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
