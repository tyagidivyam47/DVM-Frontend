import React from "react";

const DisplayCard = ({ color, post, session, createdBy, timeLimit }) => {
  return (
    <div
      className="rounded-lg w-80 flex flex-col justify-center items-center mx-auto cursor-pointer"
      style={{ background: color, color: "#525252" }}
    >
      <div className="font-semibold text-lg">{post}</div>
      <div className="ml-20">
        <div className="italic ">{session}</div>
        <div>{timeLimit} ms</div>
        <div>{createdBy}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
