import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";

const ResultInfo: FunctionComponent = () => {
  const { output, error, executionTime, buildTime, binarySize } =
    useAppSelector((state) => state.output);
  const isStatsAvailable = (executionTime || buildTime || binarySize) != "";
  if (!output && !error && !isStatsAvailable) {
    return null;
  }
  return (
    <Box id="result-view">
      {isStatsAvailable && (
        <Box
          sx={{
            marginTop: "10px",
            marginLeft: "5px",
            fontFamily: "Source Sans Pro",
            color: "white",
            fontSize: "18px",
          }}
        >
          <p>
            <span style={{ color: "#2196f3" }}>
              ========== Stats ==========
            </span>
            {executionTime ? (
              <span>
                <br />
                {`Execution time: ${executionTime} `}
              </span>
            ) : null}
            {buildTime ? (
              <span>
                <br />
                {`Build time: ${buildTime} `}
              </span>
            ) : null}
            {binarySize ? (
              <span>
                <br />
                {`Binary size: ${binarySize} `}
              </span>
            ) : null}
          </p>
        </Box>
      )}
      {output && (
        <Box
          sx={{
            marginTop: "10px",
            marginLeft: "5px",
            fontFamily: "Source Sans Pro",
            color: "white",
            fontSize: "18px",
          }}
        >
          <span style={{ color: "#4caf50" }}>========== Output ==========</span>
          <div style={{ whiteSpace: "pre-line" }}>{output + "\n"}</div>
        </Box>
      )}
      {error && (
        <Box
          sx={{
            marginTop: "10px",
            marginLeft: "5px",
            fontFamily: "Source Sans Pro",
            color: "white",
            fontSize: "18px",
          }}
        >
          <span style={{ color: "#f44336" }}>========== Error ==========</span>
          <div style={{ whiteSpace: "pre-line" }}>{error + "\n"}</div>
        </Box>
      )}
    </Box>
  );
};

export default ResultInfo;
