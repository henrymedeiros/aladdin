import prettier from "prettier/standalone";
import parser from "prettier/parser-babel";

function formatCode(code) {
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
    console.log("console nation", code);
    return code;
  }
}

export default formatCode;
