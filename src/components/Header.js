import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if(searchQuery==="")return;
    const data = await fetch(SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    // console.log("API Called");
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-10 cursor-pointer"
          onClick={() => toggleMenuHandler()}
          alt="menu-logo"
          src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-24-512.png"
        ></img>
        <a href="/">
          <img
            className="h-10 mx-8"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png"
          ></img>
        </a>
      </div>
      <div className="col-span-10 px-10">
        <input
          type="text"
          // onKeyDown={() => e.target.value.length()? setShowSuggestions(true): setShowSuggestions(false)}
          // onBlur={() => setShowSuggestions(false)}
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            e.target.value.length
              ? setShowSuggestions(true)
              : setShowSuggestions(false);
          }}
        ></input>
        <Link key={"id" + searchQuery} to={"/search?q=" + searchQuery}>
          <button
            className="border border-gray-400 px-5 py-2 rounded-r-full"
            onClick={() => {
              setSearchQuery(searchQuery);
              setShowSuggestions(false);
            }}
          >
            🔍
          </button>
        </Link>
      </div>
      {showSuggestions && (
        <div className="fixed bg-white ml-72 py-2 px-5 mt-12 w-[25rem] shadow-lg rounded-lg">
          <ul>
            {suggestions.map((s) => (
              <li
                key={s}
                className="flex font-medium mt-1 py-1 px-4 hover:bg-gray-200 hover: cursor-default"
                onClick={() => {
                  setSearchQuery(s);
                  setShowSuggestions(false);
                }}
              >
                <Link to={"/search?q=" + s}>🔍{s}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <img
          className="h-10"
          alt="user-icon"
          src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-512.png"
        ></img>
      </div>
    </div>
  );
};
