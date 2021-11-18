import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const ResultInfo: FunctionComponent = () => {
  const { output } = useAppSelector((state) => state.output);
  if (!output.trim()) {
    return null;
  }
  return (
    <Box className="ResultInfo">
      <span>
        ========== Output ========== <br /> + {output}
      </span>
    </Box>
  );
};

export default ResultInfo;
