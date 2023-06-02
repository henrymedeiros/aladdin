import prettier from "prettier/standalone";
import parser from "prettier/parser-html";

function formatCode(code) {
  try {
    return prettier.format(code, {
      parser: "html",
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

export default formatCode;
