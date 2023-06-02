import prettier from "prettier/standalone";
import parser from "prettier/parser-babel";

function formatJavascriptCode(code) {
  try {
    return prettier.format(code, {
      parser: "babel",
      plugins: [parser],
      // Set your desired formatting options here
      // For example, you can specify the indentation size
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Failed to format code:", error);
    return code;
  }
}

export default formatJavascriptCode;
