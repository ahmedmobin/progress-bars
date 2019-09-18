import React from "react";
const CountChangeButton = props => {
  return <button onClick={props.onChangeProgressBar}>{props.button}</button>;
};

export default CountChangeButton;
