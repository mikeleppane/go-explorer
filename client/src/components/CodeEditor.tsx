import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box } from "@mui/material";

const defaultCodeBlock = `
  // You can edit this code!
  // Click here and start typing.
  package main

  import "fmt"

  func main() {
      fmt.Println("Hello,世界")
  }
`;

const CodeEditor = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <MonacoEditor
        theme="vs-dark"
        defaultLanguage="go"
        defaultValue={defaultCodeBlock}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          mouseWheelZoom: true,
          automaticLayout: true,
        }}
        width="100%"
      />
    </Box>
  );
};

export default CodeEditor;
