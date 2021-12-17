import {
  buildCode,
  formatCode,
  getEnvInfo,
  getObjDump,
  lintCode,
  runCode,
  testCode,
} from "../../docker/commands";

describe("Commands executed inside Docker container", () => {
  test("getEnvInfo should return correct command", () => {
    const version = "1.17";
    const command = getEnvInfo(version);
    expect(command).toBe(
      `docker run --rm golang:${version} bash -c "echo '====GO ENVS====';go env && echo '\n====CPU ARCH===='; lscpu"`
    );
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
    const gogc = "";
    const godebug = "gctrace=1";
    const buildFlags = "-gcflags '-m -m'";
    const command = buildCode(
      goos,
      goarch,
      gogc,
      godebug,
      buildFlags,
      filePath,
      version
    );
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} --env GODEBUG=gctrace=1 golang:${version} bash -c "TIMEFORMAT=%R;time go build -o x.exe ${buildFlags} ${file} 2>&1;ls -sh x.exe | cut -d ' ' -f1"`
    );
  });
  test("getObjDump should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const goos = "linux";
    const goarch = "amd64";
    const buildFlags = "-gcflags '-S'";
    const symregexp = "";
    const command = getObjDump(
      goos,
      goarch,
      buildFlags,
      symregexp,
      filePath,
      version
    );
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} bash -c "go build -o x.exe ${buildFlags} ${file} && go tool objdump ${symregexp} x.exe"`
    );
  });
  test("runCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const gogc = "off";
    const godebug = "trace=1";
    const buildFlags = "";
    const command = runCode(gogc, godebug, buildFlags, filePath, version);
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GOGC=${gogc} --env GODEBUG=${godebug} golang:${version} bash -c "TIMEFORMAT=%R; go build -o x.exe ${buildFlags} ${file} && time ./x.exe"`
    );
  });
  test("testCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/go-main_test.go";
    const file = "go-main_test.go";
    const gogc = "";
    const godebug = "";
    const buildFlags = "";
    const testFlags = "-v -bench=. -benchtime=3s";
    const command = testCode(
      gogc,
      godebug,
      buildFlags,
      testFlags,
      filePath,
      version
    );
    expect(command).toMatch(
      `docker run --rm -v ${filePath}:/go/src/app/${file} -w /go/src/app -v "$PWD/go-modules":/go/pkg/mod --env GO111MODULE=auto golang:${version} bash -c "go build ${buildFlags} ${file} && go test ${buildFlags} ${testFlags};exit 0"`
    );
  });
});
