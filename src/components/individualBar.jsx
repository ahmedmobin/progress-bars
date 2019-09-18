import React from "react";
const IndividualBar = ({ bar, additionalClass }) => {
  console.log("hello", additionalClass);
  return (
    <div
      className={additionalClass ? "progress add" : "progress"}
      data-label={`${bar}%`}
    >
      <span className="value" style={{ width: `${bar}%` }}></span>
    </div>
  );
};

export default IndividualBar;
