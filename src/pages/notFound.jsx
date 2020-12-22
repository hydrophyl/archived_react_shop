import React from "react";
import Nav from "../components/nav.jsx";

const NotfoundPage = () => {
  return (
    <div>
      <Nav />
      <div
        style={{
          backgroundImage: "url(" + require("../statics/NASA-bg.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "30vh",
          opacity: "0.6",
          color: "white",
          padding: "5rem 2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="mr-1" style={{ paddingBottom: "5px" }}>
          404
        </h1>
        <p>
          The cosmic object you are looking for has disappeared beyond the event
          horizon.
        </p>
      </div>
    </div>
  );
};

export default NotfoundPage;
