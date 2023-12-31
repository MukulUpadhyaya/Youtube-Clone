import React, { useEffect } from "react";
import { SEARCH_RESULT_API } from "../utils/constant";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import TimeAgo from "react-timeago";

const ShowSearchResults = () => {
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get("q");
  const [searchedVideo, setSearchedVideo] = useState([]);

  useEffect(() => {
    getSearchedApiData();
  }, [searchQuery]);
  const getSearchedApiData = async () => {
    const API_KEY=process.env.REACT_APP_API_KEY;
    const data = await fetch(
      SEARCH_RESULT_API + searchQuery + "&key=" + API_KEY
    );
    const json = await data.json();
    // console.log("searchResults", json);
    setSearchedVideo(json.items);
  };
  return !searchedVideo ? null : (
    <div className="w-full mt-3 h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-[#ff0000] scrollbar-track-gray-100 scrollbar-thumb-rounded-md">
      <div className="m-6 px-2 py-1 font-medium text-lg border-b-2 w-[70%]">
        Searched for <span className="italic text-sky-500"> {searchQuery}</span>
      </div>
      <div className="m-6 px-4 py-2 w-[70%]">
        {searchedVideo.map((item, index) => {
          return (
            item.id.kind === "youtube#video" && (
              <Link
                key={item?.id?.videoId + index}
                to={"/watch?v=" + item?.id?.videoId}
              >
                <SearchedVideoTiles
                  key={item?.id?.videoId + index}
                  vidInfo={item}
                />
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};
const SearchedVideoTiles = ({ vidInfo }) => {
  return (
    <div>
      <div className="w-full my-3 grid grid-flow-col grid-cols-5 gap-5 p-2 hover:shadow-md shadow-gray-100 rounded-lg">
        <div className="col-span-2 content-center">
          <img
            className="rounded-md bg-contain min-w-full"
            src={vidInfo?.snippet?.thumbnails?.medium?.url}
            alt="video-poster"
          />
        </div>
        <div className="col-span-3">
          <p className="text-lg font-medium mb-2 line-clamp-2 ">
            {vidInfo?.snippet?.title}
          </p>
          <p className="text-base font-semibold">
            {vidInfo.snippet.channelTitle}
          </p>
          <span className="text-sm font-semibold">
            <TimeAgo date={vidInfo?.snippet?.publishedAt} />
          </span>
          <p className="my-4 text-gray-600">{vidInfo.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowSearchResults;
