import React, { useEffect, useState } from "react";
import Split from "react-split";
import CodeEditor from "./CodeEditor";
import "../../styles.css";
import ResultView from "./ResultView";

const MainView = () => {
  const [splitSizes, setSplitSizes] = useState([80, 20]);

  useEffect(() => {
    localStorage.setItem("split-sizes", JSON.stringify(splitSizes));
  }, []);

  return (
    <Split
      className="split"
      sizes={splitSizes}
      direction="horizontal"
      minSize={10}
      gutterSize={4}
      gutterAlign="center"
      dragInterval={1}
      style={{
        height: "calc(100vh - 100px)",
        overflow: "clip",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CodeEditor />
      <ResultView setSizes={setSplitSizes} />
    </Split>
  );
};

export default MainView;
