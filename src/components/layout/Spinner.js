import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <img
      src={spinner}
      alt="loading"
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
      }}
    />
  );
}
