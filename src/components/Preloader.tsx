import React from "react";

export const Preloader: React.FC = () => {
  return (
    <div className="fixed opacity-40 inset-0 bg-white flex flex-col items-center">
      <div className="m-auto w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
