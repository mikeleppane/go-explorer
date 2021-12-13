import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const ResultInfo: FunctionComponent = () => {
  const { output, error, executionTime, buildTime, binarySize } =
    useAppSelector((state) => state.output);
  const isStatsAvailable = (executionTime || buildTime || binarySize) != "";
  if (!output && !error && !isStatsAvailable) {
    return null;
  }
  return (
    <Box>
      {isStatsAvailable && (
        <Box className="ResultInfo">
          <p>
            <span style={{ color: "#2196f3" }}>
              ========== Stats ==========
            </span>
            <br /> {executionTime ? `Execution time: ${executionTime} ` : null}
            <br /> {buildTime ? `Build time: ${buildTime} ` : null}
            <br /> {binarySize ? `Binary size: ${binarySize} ` : null}
          </p>
        </Box>
      )}
      {output && (
        <Box className="ResultInfo">
          <span style={{ color: "#4caf50" }}>========== Output ==========</span>
          <br />
          <div style={{ whiteSpace: "pre-line" }}>{output + "\n\n"}</div>
        </Box>
      )}
      {error && (
        <Box className="ResultInfo">
          <span style={{ color: "#f44336" }}>========== Error ==========</span>
          <br />
          <div style={{ whiteSpace: "pre-line", overflow: "scroll" }}>
            {error + "\n\n"}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ResultInfo;
