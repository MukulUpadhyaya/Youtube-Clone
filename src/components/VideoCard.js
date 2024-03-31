import React, { useEffect, useState } from "react";
import moment from "moment";
import { abbreviateNumber } from "js-abbreviation-number";
import {
  BASE_URL,
  header,
} from "../utils/constant";

const VideoCard = ({ info }) => {
  const [channelURL, setChannelURL] = useState();
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
    statistics,
  } = info;
  useEffect(() => {
    getChannelIcon();
  }, []);
  const getChannelIcon = async () => {
    const response = await fetch(
      BASE_URL +
        `/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`,
      { header: header }
    );
    const data = await response.json();
    setChannelURL(data?.items?.[0]?.snippet?.thumbnails?.default?.url);
  };

  const seconds = moment.duration(contentDetails?.duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  return (
    <div className="flex flex-col mb-8 ">
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img className="h-full w-full object-cover" alt="" src={medium.url} />
        {contentDetails?.duration && (
          <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {contentDetails?.duration ? _duration : "00:00"}
          </span>
        )}
      </div>
      <div className="flex text-black dark:text mt-3">
        <div className="flex items-start">
          <div className="flex h-9 w-9 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              alt=""
              src={channelURL}
            />
          </div>
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-sm font-bold line-clamp-2">{title}</span>
          <span className="text-[12px] font-semibold mt-2 text-black/[0.7] flex items-center">
            {channelTitle}
          </span>
          <div className="flex text-[12px] font-semibold text-black/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(statistics?.viewCount, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-black/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
