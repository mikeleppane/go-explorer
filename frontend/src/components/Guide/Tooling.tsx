import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import FormatMenuImg from "./images/format-menu.png";
import LintMenuImg from "./images/lint-menu.png";

const Tooling = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Tooling">Tooling</a>
      </Typography>
      <HorizontalLine />
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Format Code
      </Typography>
      <img src={FormatMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        This allows you to format your code and your imports. We use{" "}
        <a
          className="customlink"
          style={{
            fontSize: "inherit",
          }}
          href="https://pkg.go.dev/golang.org/x/tools/cmd/goimports"
          target="_blank"
          rel="noreferrer"
        >
          goimports
        </a>{" "}
        to accomplish this.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Analyze Code
      </Typography>
      <img src={LintMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        You can perform static analysis for your code. This is done by the{" "}
        <a
          className="customlink"
          style={{
            fontSize: "inherit",
          }}
          href="https://pkg.go.dev/cmd/vet"
          target="_blank"
          rel="noreferrer"
        >
          go vet
        </a>{" "}
        tool.
      </Typography>
    </Box>
  );
};

export default Tooling;
