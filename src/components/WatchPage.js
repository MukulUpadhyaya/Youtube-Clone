import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { YOUTUBE_VIDEO_INFO_URL } from "../utils/constant";
function WatchPage() {
  const dispatch = useDispatch();
  const [videoInfo, setVideoInfo] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  useEffect(() => {
    dispatch(closeMenu());
    getVideoInfo();
  }, []);
  const [params] = useSearchParams();
  const getVideoInfo = async () => {
    const data = await fetch(YOUTUBE_VIDEO_INFO_URL + params.get("v"));
    const json = await data.json();
    setVideoInfo(json.items[0]);
  };
  if (!videoInfo) return null;
  const maxDescriptionLength = 150;
  const { snippet, contentDetails, statistics } = videoInfo;
  const shortDesc =
    snippet?.description.length > maxDescriptionLength
      ? `${snippet?.description.substring(0, maxDescriptionLength)}...`
      : snippet?.description;
  const formattedDescription = snippet?.description
    .split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  console.log(videoInfo);
  return (
    <div className="flex flex-col w-full">
      <div className="flex ">
        <div className="px-5 ">
          <iframe
            className="rounded-md"
            width="800"
            height="400"
            src={"https://www.youtube.com/embed/" + params.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {videoInfo && (
            <div className="w-full  mt-5">
              <h2 className="text-xl font-bold mt-4">{snippet?.title}</h2>
              <div>
                <h2 className="font-bold text-xl">{snippet?.channelTitle}</h2>
                <h2 className="font-bold text-gray-900 text-xl">
                  {statistics.likeCount} Likes
                </h2>
              </div>
              <div className="bg-gray-200 rounded-lg p-3 font-medium w-[calc(100% - 40px)] ">
                <p>
                  {" "}
                  {showFullDescription ? formattedDescription : shortDesc}{" "}
                  <span
                    className="text-black font-medium text-lg cursor-pointer"
                    onClick={toggleDescription}
                  >
                    {" "}
                    {showFullDescription ? "Show Less" : "Show More"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
        <LiveChat />
      </div>
      <CommentsContainer videoId={params.get("v")} />
    </div>
  );
}

export default WatchPage;
