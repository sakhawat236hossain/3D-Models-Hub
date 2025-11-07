import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20 z-50">
      <div className="h-14 w-14 border-4 border-white/20 border-t-white rounded-full animate-spin-slow shadow-lg"></div>
    </div>
  );
};

export default Spinner;
