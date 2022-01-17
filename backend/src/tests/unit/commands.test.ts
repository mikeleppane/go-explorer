import {
  buildCode,
  envInfo,
  formatCode,
  lintCode,
  objDump,
  runCode,
  testCode,
} from "../../docker/commands";

describe("Commands executed inside Docker container", () => {
  test("getEnvInfo should return correct command", () => {
    const version = "1.17";
    const command = envInfo(version);
    expect(command).toBe(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" golang:${version} timeout 60 bash -c "echo '====Go ENVS====';go env && echo '\n====CPU ARCH===='; lscpu | grep -iE 'Architecture:|CPU op-mode\\(s\\):|CPU\\(s\\):|Thread\\(s\\) per core:|Core\\(s\\) per socket:|NUMA node\\(s\\):|Vendor ID:|CPU family:|Model:|Model name:|CPU MHz:|L1d cache:|L1i cache:|L2 cache:'"`
    );
  });
  test("formatCode should return correct command", () => {
    const version = "1.16";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const command = formatCode(filePath, version);
    expect(command).toBe(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} golang:${version} timeout 60 goimports ${file}`
    );
  });
  test("lintCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const command = lintCode(filePath, version);
    expect(command).toBe(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} golang:${version} timeout 60 go vet ${file}`
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
    const command = buildCode(filePath, {
      goos,
      goarch,
      gogc,
      godebug,
      buildFlags,
      version,
    });
    expect(command).toMatch(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} --env GOOS=${goos} --env GOARCH=${goarch} --env GODEBUG=gctrace=1 golang:${version} timeout 60 bash -c "TIMEFORMAT=%R;time go build -o x.exe ${buildFlags} ${file} 2>&1;ls -sh x.exe | cut -d ' ' -f1"`
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
    const command = objDump(filePath, {
      goos,
      goarch,
      buildFlags,
      symregexp,
      version,
    });
    expect(command).toMatch(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} timeout 60 bash -c "go build -o x.exe ${buildFlags} ${file} && go tool objdump ${symregexp} x.exe"`
    );
  });
  test("runCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/test.go";
    const file = "test.go";
    const gogc = "off";
    const godebug = "trace=1";
    const buildFlags = "";
    const command = runCode(filePath, { gogc, godebug, buildFlags, version });
    expect(command).toMatch(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} --env GOGC=${gogc} --env GODEBUG=${godebug} golang:${version} timeout 60 bash -c "TIMEFORMAT=%R; go build -o x.exe ${buildFlags} ${file} && time ./x.exe"`
    );
  });
  test("testCode should return correct command", () => {
    const version = "1.17";
    const filePath = "/tmp/go-main_test.go";
    const file = "go-main_test.go";
    const buildFlags = "";
    const testFlags = "-v -bench=. -benchtime=3s";
    const command = testCode(filePath, {
      buildFlags,
      testFlags,
      version,
    });
    expect(command).toMatch(
      `docker run --rm --security-opt=no-new-privileges --network none --cpus="0.5" -v ${filePath}:/go/src/app/${file} --env GO111MODULE=auto golang:${version} timeout 60 bash -c "go build ${buildFlags} ${file} && go test ${buildFlags} ${testFlags};exit 0"`
    );
  });
});
