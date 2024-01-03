import React from "react";
import Button from "./Button";
import { VIDEO_CATEGORIES_API, API_KEY } from "../utils/constant";
import { useEffect } from "react";
import { useState } from "react";
export const ButtonList = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(VIDEO_CATEGORIES_API + API_KEY);
      const json = await data.json();
      setCategoryList(json.items);
    };

    getData();
  }, []);
  if (categoryList.length === 0) return null;
  return (
    <div className="flex">
      {categoryList.map((category, index) => {
        return (
          index <= 7 && (
            <Button
              key={category.id}
              categoryId={category.id}
              name={category?.snippet?.title}
            />
          )
        );
      })}
    </div>
  );
};
