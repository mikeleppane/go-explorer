import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Pane from "react-split-pane/lib/Pane";
import CodeEditor from "./CodeEditor";
import CodeOutputView from "./CodeOutputView";

const bottomPaneDefaultSize = (window.innerHeight * 0.1).toString() + "px";

const ExplorerView = () => {
  const [codeOutputViewSize, setCodeOutputViewSize] = useState(
    bottomPaneDefaultSize
  );

  useEffect(() => {
    localStorage.setItem("bottomPaneDefaultSize", bottomPaneDefaultSize);
  }, []);

  return (
    <SplitPane
      split="horizontal"
      // onChange={(size: unknown) => {
      //   if (
      //     Array.isArray(size) &&
      //     size.every((item) => typeof item === "string")
      //   ) {
      //     localStorage.setItem("bottomPanePos", size[1]);
      //   }
      // }}
    >
      <Pane
        initialSize={(window.innerHeight * 0.8).toString() + "px"}
        minSize="10%"
        primary="second"
      >
        <CodeEditor />
      </Pane>
      <Pane size={codeOutputViewSize} minSize={bottomPaneDefaultSize}>
        <CodeOutputView setPaneSize={setCodeOutputViewSize} />
      </Pane>
    </SplitPane>
  );
};

export default ExplorerView;
