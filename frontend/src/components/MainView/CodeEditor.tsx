import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import * as monaco from "monaco-editor";
import { addNewCode, clearError } from "../../state/actionCreators";
import { useDispatch } from "react-redux";
import { LocalStorage } from "../../services/localStorage";
import { dispatchKeyboardEvent } from "../../services/keyboardEventDispatcher";

const CodeEditor = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const storage = new LocalStorage("", "golang-explorer-recent-code");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [oldDecorations, setOldDecorations] = useState<string[]>([]);

  useEffect(() => {
    if (
      editorRef.current &&
      Array.isArray(state.error) &&
      state.error.length > 0
    ) {
      const decorations: monaco.editor.IModelDeltaDecoration[] = [];
      state.error.map((error) => {
        decorations.push({
          range: {
            startLineNumber: error.lineNumber,
            startColumn: error.columnNumber,
            endColumn: error.columnNumber + 200,
            endLineNumber: error.lineNumber,
          },
          options: {
            inlineClassName: "errorHighlight",
            hoverMessage: [{ value: error.message }],
          },
        });
      });
      setOldDecorations(editorRef.current?.deltaDecorations([], decorations));
    } else {
      editorRef.current?.deltaDecorations(oldDecorations, []);
    }
  }, [state.error]);

  const onEditorChange = (
    value: string | undefined,
    _ev: monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      dispatch(clearError());
      dispatch(addNewCode(value));
      storage.state = value;
      editorRef.current?.deltaDecorations([], []);
    }
  };

  return (
    <Box
      id="editor"
      sx={{ flexGrow: 1, height: "100%" }}
      onKeyDown={(e) => {
        dispatchKeyboardEvent(e);
      }}
    >
      <MonacoEditor
        onChange={onEditorChange}
        theme="vs-dark"
        defaultLanguage="go"
        value={state.code[state.tab.currentTab]}
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
        onMount={(editor, _monaco) => {
          editorRef.current = editor;
        }}
      />
    </Box>
  );
};

export default CodeEditor;
