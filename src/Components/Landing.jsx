import React from "react";
import video from "../assets/Lnading-video.mp4";

export default function Landing() {
  return (
    <>
      <div
        className="landing-section position-relative w-100"
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          id="bg-video"
          className="position-absolute w-100 h-100"
          style={{
            top: "0",
            left: "0",
            objectFit: "cover",
            zIndex: "-1",
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className="landing-content position-relative"
          style={{
            zIndex: "1",
            color: "white",
          }}
        >
          <h1>WELCOME TO THE LANDING PAGE</h1>
          <p>Here you can add your content to the landing page</p>
        </div>
      </div>
    </>
  );
}
