import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const ResultInfo: FunctionComponent = () => {
  const { output, error, executionTime } = useAppSelector(
    (state) => state.output
  );
  const isStatsAvailable = executionTime;
  if (!output.trim() && !error.trim() && !executionTime.trim()) {
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
          </p>
        </Box>
      )}
      {output && (
        <Box className="ResultInfo">
          <span style={{ color: "#4caf50" }}>========== Output ==========</span>
          <br />
          <div style={{ whiteSpace: "pre-line" }}>{output}</div>
        </Box>
      )}
      {error && (
        <Box className="ResultInfo">
          <span style={{ color: "#f44336" }}>========== Error ==========</span>
          <br />
          <div style={{ whiteSpace: "pre-line", overflow: "scroll" }}>
            {error}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ResultInfo;
