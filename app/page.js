"use client";
import { useState, useRef } from "react";
import formatCode from "./utils/formatCode";
import formatJavascriptCode from "./utils/formatJavascriptCode";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Sidebar from "./components/Sidebar";
import CopyButton from "./components/CopyButton";
import InputTextField from "./components/InputTextField";
import Button from "./components/Button";

export default function Home() {
  const [codeStringValue, setCodeStringValue] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [delayOption, setDelayOption] = useState("no-delay");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Henry Medeiros"); // aplicar localstorage aqui
  const textareaRef = useRef(null);

  function getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); //
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  function wrapCode(codeString, author, wrapType = "full-wrap") {
    if (!codeString) return;
    let teste;
    if (delayOption === "no-delay") {
      teste = formatJavascriptCode(`(() => {
        ${codeString.trim()}
      })();`);
    } else if (delayOption === "minor-delay") {
      teste = formatJavascriptCode(`
      document.addEventListener('DOMContentLoaded', () => { 
          ${codeString.trim()}
      });
      `);
    } else if (delayOption === "major-delay") {
      teste = formatJavascriptCode(`
      document.addEventListener('readystatechange', event => { 
        if (event.target.readyState === "complete") {
            ${codeString.trim()}
        }
    });
      `);
    }
    if (wrapType === "parcial-wrap") {
      return teste;
    }
    if (wrapType === "style-wrap") {
      return formatCode(`
    <!-- ${description} -->
    <!-- ${getFormattedDate(new Date())} | ${author} -->
    <style>${codeString}</style>
    `);
    }
    return formatCode(`
    <!-- ${description} -->
    <!-- ${getFormattedDate(new Date())} | ${author} -->
    <script>${teste.trim()}</script>
    `);
  }

  const handleWrapCode = (e) => {
    const textAreavalue = textareaRef.current.value;
    setFormattedCode(wrapCode(textAreavalue, author, e.target.value));
    setDescription("");
  };

  const handleDelayOption = (event) => {
    setDelayOption(event.target.value);
  };

  return (
    <div id="content-area" className="col-span-10">
      <div id="code-wrapper">
        <div className="flex h-1/2">
          <textarea
            placeholder="Enter your code here"
            id=""
            value={codeStringValue}
            ref={textareaRef}
            onChange={(e) => setCodeStringValue(e.target.value)}
            className="w-1/2 h-full p-4 bg-gray-900 text-white"
            cols="30"
            rows="10"
          ></textarea>
          <SyntaxHighlighter language="html" style={darcula} className="w-1/2">
            {formattedCode}
          </SyntaxHighlighter>
        </div>
        <input
          type="text"
          placeholder="Enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Henry Medeiros">Henry Medeiros</option>
          <option value="Paulo Moreira">Paulo Moreira</option>
        </select>

        <Button
          onClick={handleWrapCode}
          label={"Wrap Code"}
          value={"full-wrap"}
          className={"btn bg-green-300 p-2"}
        >
          {" "}
        </Button>
        <Button
          onClick={handleWrapCode}
          label={"Parcial Wrap"}
          value={"parcial-wrap"}
          className={"btn bg-green-500 p-2"}
        >
          {" "}
        </Button>
        <Button
          onClick={handleWrapCode}
          label={"Style Wrap"}
          value={"style-wrap"}
          className={"btn bg-green-800 p-2"}
        >
          {" "}
        </Button>
        <CopyButton text={formattedCode}></CopyButton>

        <div>
          <input
            type="radio"
            name="no-delay"
            id="no-delay"
            value="no-delay"
            checked={delayOption === "no-delay"}
            onChange={handleDelayOption}
          />
          <label htmlFor="no-delay">No delay</label>
        </div>
        <div>
          <input
            type="radio"
            name="delay"
            value="minor-delay"
            id="minor-delay"
            checked={delayOption === "minor-delay"}
            onChange={handleDelayOption}
          />
          <label htmlFor="minor-delay">Add minor delay</label>
        </div>
        <div>
          <input
            type="radio"
            name="delay"
            value="major-delay"
            id="major-delay"
            checked={delayOption === "major-delay"}
            onChange={handleDelayOption}
          />
          <label htmlFor="major-delay">Add major delay</label>
        </div>
      </div>
    </div>
  );
}
