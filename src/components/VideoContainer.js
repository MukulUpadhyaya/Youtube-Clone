import React, { useEffect, useState } from "react";
import  VideoCard  from "./VideoCard";
import { YOUTUBE_API } from "../utils/constant";
import { Link } from "react-router-dom";
import { addVideoList } from "../utils/videoSlice";
import { useDispatch, useSelector } from "react-redux";
export const VideoContainer = () => {
  const dispatch = useDispatch();
  const videoList = useSelector((store) => store.video.videoList);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const JSON = await data.json();
    dispatch(addVideoList(JSON.items));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
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
