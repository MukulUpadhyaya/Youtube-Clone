import React from "react";

const commentsData = [
  {
    name: "Mukul",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    replies: [],
  },
  {
    name: "Mukul",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    replies: [
      {
        name: "Mukul",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        replies: [
          {
            name: "Mukul",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
            replies: [
              {
                name: "Mukul",
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mukul",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    replies: [
      {
        name: "Mukul",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        replies: [],
      },
    ],
  },
  {
    name: "Mukul",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    replies: [
      {
        name: "Mukul",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        replies: [
          {
            name: "Mukul",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
            replies: [],
          },
        ],
      },
    ],
  },
];


const Comments = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="my-4 flex shadow-sm bg-gray-100 p-2 rounded-md">
      <img
        className="w-8 h-8"
        alt="user"
        src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-512.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    comments.map((comment, index) => (
    <div>
    <Comments data={comment} />
    <div className="pl-5 border border-l-black ml-5">
        <CommentList key={index} comments={comment.replies} />
    </div>
    </div>
    )));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
