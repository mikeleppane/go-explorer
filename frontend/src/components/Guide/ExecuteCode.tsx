import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import RunMenuImg from "./images/run-menu.png";
import BuildMenuImg from "./images/build-menu.png";
import RunOutputImg from "./images/run-output.png";
import BuildOutputImg from "./images/build-output.png";
import TestMenuImg from "./images/testing-menu.png";

const ExecuteCode = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Executing Code" style={{ fontSize: "inherit" }}>
          Executing Code
        </a>
      </Typography>
      <HorizontalLine />
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Running Code (Ctrl+Alt+Enter)
      </Typography>
      <img src={RunMenuImg} alt="run-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        <i>
          <strong>RUN</strong>
        </i>{" "}
        simply builds and executes your code (or use shortcut: Ctrl+Alt+Enter).
        If the run is successful, it will provide the execution time and
        possible code output (some output might be seen under error depending on
        how you configured the execution e.g. escape analysis). In case
        there&apos;s some error, the Code Output View will indicate an error as
        well as the status bar. In addition, erroneous code will the highlighted
        in the editor. Note: check the status bar to see the current situation.
      </Typography>
      <img src={RunOutputImg} alt="run-output" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        Right next to the RUN button there&apos;s a button with an arrow down
        which gives you the run options. Inside <i>Run Options</i> you can
        configure the following stuff:
        <ul>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
              target="_blank"
              rel="noreferrer"
            >
              Build flags
            </a>
            : specify custom flags on how you want the code to be built. You
            will give them to the compiler as you would from the CLI, e.g.{" "}
            <i>
              <strong>
                -gcflags=&apos;-m -m&apos; -ldflags=&apos;-w -s&apos;
              </strong>
            </i>
            . Remember to use apostrophes! Underneath is a link to current build
            options.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GOGC
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GODEBUG
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://go.dev/doc/devel/release"
              target="_blank"
              rel="noreferrer"
            >
              VERSIONS
            </a>
            : Currently we support the following Go versions: 1.16, 1.17, and
            1.18-rc. You can choose one of them when running the code. The
            default is 1.17.
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Building Code
      </Typography>
      <img src={BuildMenuImg} alt="build-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        <i>
          <strong>BUILD</strong>
        </i>{" "}
        simply builds your code (or use shortcut: Ctrl+Alt+B). If the build is
        successful, it will provide a build time and a binary size as statistics
        for the build and, in addition, possible output depending on the build
        flags. In case there&apos;s some error, the Code Output View will
        indicate an error as well as the Status Bar. In addition, erroneous code
        will the highlighted in the editor. Note: check the status bar to see
        the current situation.
      </Typography>
      <img
        src={BuildOutputImg}
        alt="build-output"
        style={{ marginTop: "5px" }}
      />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        Right next to the BUILD button there&apos;s a button with an arrow down
        which gives you the build options. Inside <i>Build Options</i> you can
        configure the following stuff:
        <ul>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
              target="_blank"
              rel="noreferrer"
            >
              Build flags
            </a>
            : specify custom flags on how you want the code to be built. You
            will give them to the compiler as you would from the CLI, e.g.{" "}
            <i>
              <strong>-gcflags=&apos;-S&apos;</strong>
            </i>
            . Remember to use apostrophes! Underneath is a link to current build
            options.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GOGC
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GODEBUG
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://go.dev/doc/install/source#environment"
              target="_blank"
              rel="noreferrer"
            >
              GOARCH
            </a>
            : this allows you to change the CPU architecture during the build
            time if for instance you want to see the generated assembly code for
            a different architecture. See the link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://go.dev/doc/install/source#environment"
              target="_blank"
              rel="noreferrer"
            >
              GOOS
            </a>
            : this allows you to change the target operating system during the
            build time if for instance, you want to see the generated assembly
            code for a different operating system. See the link for more info in
            detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://go.dev/doc/devel/release"
              target="_blank"
              rel="noreferrer"
            >
              VERSIONS
            </a>
            : Currently we support the following Go versions: 1.16, 1.17, and
            1.18-rc. You can choose one of them when running the code. The
            default is 1.17.
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Testing Code
      </Typography>
      <img src={TestMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        <i>
          <strong>TESTING</strong>
        </i>{" "}
        allows you to unit test and benchmark your code (or use shortcut:
        Ctrl+Alt+T). Check the following links how to get started with unit
        testing and benchmarking in Go:{" "}
        <a
          className="customlink"
          style={{
            fontSize: "inherit",
          }}
          href="https://go.dev/doc/tutorial/add-a-test"
          target="_blank"
          rel="noreferrer"
        >
          Add a test
        </a>
        ,{" "}
        <a
          className="customlink"
          style={{
            fontSize: "inherit",
          }}
          href="https://pkg.go.dev/testing#hdr-Benchmarks"
          target="_blank"
          rel="noreferrer"
        >
          Benchmarks
        </a>
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        Right next to the TESTING button there&apos;s a button with an arrow
        down which gives you testing options. Inside the <i>Testing Options</i>{" "}
        you can configure the following stuff:
        <ul>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
              target="_blank"
              rel="noreferrer"
            >
              Build flags
            </a>
            : you can specify build flags on how you want the code to be built.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/cmd/go#hdr-Testing_flags"
              target="_blank"
              rel="noreferrer"
            >
              Testing flags
            </a>
            : you can specify testing flags. You will give them to the compiler
            as you would from the CLI, e.g.{" "}
            <i>
              <strong>-v -bench=.</strong>
            </i>
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GOGC
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
              target="_blank"
              rel="noreferrer"
            >
              GODEBUG
            </a>
            : you can define a value for the GOGC environment variable. See the
            link for more info in detail.
          </li>
          <li>
            <a
              className="customlink"
              style={{
                fontSize: "inherit",
              }}
              href="https://go.dev/doc/devel/release"
              target="_blank"
              rel="noreferrer"
            >
              VERSIONS
            </a>
            : Currently we support the following Go versions: 1.16, 1.17, and
            1.18-rc. You can choose one of them when running the code. The
            default is 1.17.
          </li>
        </ul>
      </Typography>
    </Box>
  );
};

export default ExecuteCode;
