import React from "react";
import missingSite from "../assets/notfound.jpg";

const Missing = () => {
  return (
    <div className="img-container">
      <img src={missingSite} alt="missing-page" className="image" />
      <h1 className="alertText"> Page Not Found</h1>
    </div>
  );
};

export default Missing;
