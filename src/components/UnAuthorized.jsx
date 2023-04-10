import React from "react";
import unAuthorized from "../assets/unauthorized.jpg";
const UnAuthorized = () => {
  return (
    <div className="img-container">
      <img src={unAuthorized} alt="unauthorized-page" className="image" />
      <h1 className="alertText"> You are Not Authorized to visit this Page</h1>
    </div>
  );
};

export default UnAuthorized;
