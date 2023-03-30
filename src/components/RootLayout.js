import React from "react";
import NavBar from "./NavBar";

const RootLayout = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

export default RootLayout;
