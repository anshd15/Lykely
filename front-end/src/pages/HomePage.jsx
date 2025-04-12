import React from "react";
import Player from "../components/Player";

const HomePage = () => {
  return (
    <div className="h-[90vh] w-screen flex items-center justify-center bg-black relative ">
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
        <img src="/ab4.png" draggable="false" className="w-full h-full object-cover blur-[0px]" />
      </div>
      <div className="h-[90vh] w-min relative hide-scrollbar overflow-y-hidden flex justify-center bottom-0   ">
        <Player />
      </div>
    </div>
  );
};

export default HomePage;
