import React from "react";

export function Board(props) {
  const type = props.type;
  const playerCount = props.playerCount;
  const enactedCount = props.enactedCount;
  let path = "";
  if (type === "Liberal") {
    path = "images/boards/liberal/liberal" + enactedCount + ".png";
  } else {
    if (playerCount <= 6) {
      path = "images/boards/fascist5-6/fascist" + enactedCount + ".png";
    } else if (playerCount <= 8) {
      path = "images/boards/fascist7-8/fascist" + enactedCount + ".png";
    } else {
      path = "images/boards/fascist9-10/fascist" + enactedCount + ".png";
    }
  }
  return (
    <>
      <img className="board" src={path} alt={type + " board"} />
    </>
  );
}
