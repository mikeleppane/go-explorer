import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box } from "@mui/material";
import { useAppSelector } from "../types";

const CodeEditor = () => {
  const code = useAppSelector((state) => state.code);
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <MonacoEditor
        theme="vs-dark"
        defaultLanguage="go"
        value={code}
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
