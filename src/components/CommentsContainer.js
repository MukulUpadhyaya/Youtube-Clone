import React, { useEffect, useState } from "react";


const Comments = ({ data }) => {
  const {
    snippet: {
      topLevelComment: { snippet },
    },
    replies,
  } = data;
  const { authorDisplayName, textDisplay, authorProfileImageUrl
  } = snippet;

  return (
    <div className="my-4 flex shadow-sm bg-gray-100 p-2 rounded-md">
      <img
        className="w-8 h-8 rounded-2xl"
        alt="user"
        src = {authorProfileImageUrl}
        //src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-512.png"
      />
      <div className="px-3">
        <p className="font-bold">{authorDisplayName.replace('@', '')}</p>
        {/* {console.log(replies, "Reply")} */}
        <p>{textDisplay}</p>
        {replies && replies.length > 0 && (
          <div className="pl-5 border border-l-black ml-5">
            <CommentList comments={replies} />
          </div>
        )}
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      {comments?.map((comment, index) => (
        <Comments key={index} data={comment} />
      ))}
    </>
  );
};

const CommentsContainer = ({ videoId }) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=` +
            process.env.REACT_APP_API_KEY
        );
        const json = await response.json();
        setCommentsData(json?.items ? json?.items : json);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getComments();
  }, [videoId]);

  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
