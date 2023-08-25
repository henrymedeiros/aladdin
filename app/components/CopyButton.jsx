import React from "react";

function CopyButton({text}) {
  return (
    <button
      className="btn bg-blue-500 p-2"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      Copy!
    </button>
  );
}

export default CopyButton;
