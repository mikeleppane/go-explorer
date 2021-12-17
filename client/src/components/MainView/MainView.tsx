import React, { useEffect, useState } from "react";
import Split from "react-split";
import CodeEditor from "./CodeEditor";
import ResultView from "./ResultView";

const defaultSplitSize = (window.innerHeight - 150).toString() + "px";

const MainView = () => {
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
      <ResultView setSizes={setSplitSizes} />
    </Split>
  );
};

export default MainView;
