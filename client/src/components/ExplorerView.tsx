import React, { useEffect, useState } from "react";
import Split from "react-split";
import CodeEditor from "./CodeEditor";
import CodeOutputView from "./CodeOutputView";

const defaultSplitSize = (window.innerHeight - 100).toString() + "px";

const ExplorerView = () => {
  const [splitSizes, setSplitSizes] = useState([80, 20]);

  useEffect(() => {
    localStorage.setItem("split-sizes", JSON.stringify(splitSizes));
  }, []);

  return (
    <Split
      className="split"
      sizes={splitSizes}
      direction="vertical"
      minSize={10}
      gutterSize={5}
      gutterAlign="center"
      dragInterval={1}
      style={{ height: defaultSplitSize }}
    >
      <CodeEditor />
      <CodeOutputView setSizes={setSplitSizes} />
    </Split>
  );
};

export default ExplorerView;
