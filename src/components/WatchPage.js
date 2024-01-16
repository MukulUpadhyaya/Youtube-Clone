import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

function WatchPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex flex-col w-full">
      <div className="flex ">
      <div className="px-5">
      <iframe className="rounded-md"
        width="800"
        height="400"
        src={"https://www.youtube.com/embed/"+searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      </div>
      <LiveChat/>
      </div>
      <CommentsContainer videoId={searchParams.get("v")}/>
    </div>
  );
}

export default WatchPage;
