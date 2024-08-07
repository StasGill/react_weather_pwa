import React from "react";
import "./tile.css";

function Tile({ data, text }) {
  return (
    <div className="tile">
      <h3>{text}</h3>
      <p>{data}</p>
    </div>
  );
}

export default Tile;
