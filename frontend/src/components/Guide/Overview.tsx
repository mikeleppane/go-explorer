import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";

const Overview = () => {
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Overview">Welcome to Go Explorer</a>
      </Typography>
      <HorizontalLine />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        Go Explorer is an online environment where you can learn, explore and
        experiment{" "}
        <a
          style={{
            fontSize: "inherit",
          }}
          className="customlink"
          href="https://go.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Go
        </a>{" "}
        code. It&apos;s immediately ready for action without any setups. You can
        easily share your code with your friends. Go Explorer provides you with
        a user-friendly and safe platform to try Go code.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Features
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        <ol>
          <li>
            A clear and user-friendly UI with VS Code-like experience including
            syntax highlighting.
          </li>
          <li>
            You can run, build or test your code with chosen flags including a
            few environment variables.
          </li>
          <li>
            You can format{" "}
            <a
              style={{
                fontSize: "inherit",
              }}
              className="customlink"
              href="https://pkg.go.dev/golang.org/x/tools/cmd/goimports"
              target="_blank"
              rel="noreferrer"
            >
              goimports
            </a>{" "}
            and statically analyze{" "}
            <a
              style={{
                fontSize: "inherit",
              }}
              className="customlink"
              href="https://pkg.go.dev/cmd/vet"
              target="_blank"
              rel="noreferrer"
            >
              go vet
            </a>{" "}
            your code.
          </li>
          <li>
            Error highlighting is supported directly in the code in case your
            code fails to build or the static analyzer finds some error.
          </li>
          <li>You can share your code with your friends by a link.</li>
          <li>
            Tabs are available if you like to experiment with different codes at
            the same time.
          </li>
          <li>
            Basic statistics are provided after an execution: build time, binary
            size, and execution time.
          </li>
          <li>You can import your code from your local computer.</li>
          <li>
            Several code templates are available to you if you need something to
            start with, including basic, testing, benchmarking, concurrency and
            generics.
          </li>
          <li>
            The most recently edited code is always kept in the local store if
            in case you accidentally close your session or a browser crashes.
          </li>
          <li>
            Currently available versions are: 1.16, 1.17, and 1.18-rc
            (generics!)
          </li>
        </ol>
      </Typography>
    </Box>
  );
};

export default Overview;
