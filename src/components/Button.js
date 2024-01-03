import React from "react";
import { YOUTUBE_API } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addVideoList } from "../utils/videoSlice";
function Button({ name, categoryId }) {
  const dispatch = useDispatch();
  const handleClick = async (categoryId) => {
    const data = await fetch(
      YOUTUBE_API + "&chart=mostPopular&videoCategoryId=" + categoryId
    );
    const json = await data.json();
    if (json.items) dispatch(addVideoList(json.items));
  };
  return (
    <div>
      <button
        onClick={() => handleClick(categoryId)}
        className="px-5 py-2 m-2 bg-gray-200 rounded-lg"
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
