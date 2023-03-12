import React from "react";
import "./spinner.scss";

export default function LoadingSpinner() {
  return (
    <>

      <div className="content">
        <div className="loading">
          <p>loading</p>
          <span></span>
        </div>
      </div></>
  );
}