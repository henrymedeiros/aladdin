"use client";
const prettier = require("prettier");
import { useState, useRef } from "react";
import formatCode from "./utils/formatCode";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
  const [codeStringValue, setCodeStringValue] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [description, setDescription] = useState("");
  const textareaRef = useRef(null);

  function getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); //
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  function wrapCode(codeString, author = "Henry Medeiros", description = "") {
    if (!codeString) return;

    console.log(formatCode(codeString));
    return `
    <!-- ${description} -->
    <!-- ${getFormattedDate(new Date())} | ${author} -->
    <script>
      ${formatCode(codeString)}
    </script>
    `;
  }

  const handleWrapCode = () => {
    const value = textareaRef.current.value;
    setFormattedCode(wrapCode(value));
  };

  return (
    <>
      <textarea
        placeholder="Enter your code here"
        id=""
        value={codeStringValue}
        ref={textareaRef}
        onChange={(e) => setCodeStringValue(e.target.value)}
        className="w-full h-full p-4 bg-gray-900 text-white"
        cols="30"
        rows="10"
      ></textarea>
      <input
        type="text"
        placeholder="Enter your description"
        //value={description}
        //onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleWrapCode} className="btn bg-green-300 p-2">
        Wrap code
      </button>
      <div>
        <h1>Formatted code</h1>
        <SyntaxHighlighter language="javascript" style={docco}>
          {formattedCode}
        </SyntaxHighlighter>

        <button
          className="btn bg-blue-500 p-5"
          onClick={() => {
            navigator.clipboard.writeText(formattedCode);
          }}
        >
          Copy!
        </button>
      </div>
    </>
  );
}
