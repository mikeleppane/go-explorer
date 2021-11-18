import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import * as monaco from "monaco-editor";
import { addNewCode } from "../state/actionCreators";
import { useDispatch } from "react-redux";

const CodeEditor = () => {
  const code = useAppSelector((state) => state.code);
  const dispatch = useDispatch();

  const onEditorChange = (
    value: string | undefined,
    _ev: monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      dispatch(addNewCode(value));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <MonacoEditor
        onChange={onEditorChange}
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
