import {
  buildCode,
  formatCode,
  getEnvInfo,
  getObjDump,
  lintCode,
  runCode,
} from "../../docker/commands";

describe("Commands executed inside Docker container", () => {
  test("getEnvInfo should return correct command", () => {
    const version = "1.17";
    const command = getEnvInfo(version);
    expect(command).toBe(`docker run --rm golang:${version} go env`);
  });
  test("formatCode should return correct command", () => {
    const version = "1.16";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const command = formatCode(filePath, version);
    expect(command).toBe(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app golang:${version} gofmt -w ${file}`
    );
  });
  test("lintCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const command = lintCode(filePath, version);
    expect(command).toBe(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app golang:${version} go vet ${file}`
    );
  });
  test("buildCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const goos = "linux";
    const goarch = "amd64";
    const buildOptions = "-gcflags '-m -m'";
    const command = buildCode(goos, goarch, buildOptions, filePath, version);
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} bash -c "TIMEFORMAT=%R;time go build -o x.exe ${buildOptions} ${file} 2>&1;ls -sh x.exe | cut -d ' ' -f1"`
    );
  });
  test("getObjDump should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const goos = "linux";
    const goarch = "amd64";
    const buildOptions = "-gcflags '-S'";
    const symregexp = "";
    const command = getObjDump(
      goos,
      goarch,
      buildOptions,
      symregexp,
      filePath,
      version
    );
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} bash -c "go build -o x.exe ${buildOptions} ${file} && go tool objdump ${symregexp} x.exe"`
    );
  });
  test("runCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const goos = "linux";
    const goarch = "amd64";
    const buildOptions = "";
    const command = runCode(goos, goarch, buildOptions, filePath, version);
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} bash -c "TIMEFORMAT=%R; go build -o x.exe ${buildOptions} ${file} && time ./x.exe"`
    );
  });
});
