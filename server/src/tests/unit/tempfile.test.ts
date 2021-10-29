import { createTempFile } from "../../utils/tempfile";
import os from "os";
import * as fs from "fs/promises";
import * as uuid from "uuid";
import logger from "../../utils/logging";

jest.mock("fs/promises");
jest.mock("uuid");
jest.mock("../../utils/logging");

describe("tempfile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("temp file should be created", async () => {
    const mockTmpDir = jest.spyOn(os, "tmpdir"); // spy on fs.readFileSync()
    mockTmpDir.mockImplementation(function () {
      return "temp";
    });
    const mockedUuid = uuid as jest.Mocked<typeof uuid>;
    mockedUuid.v4.mockImplementation(() => "11-22");
    const mockedJs = fs as jest.Mocked<typeof fs>;
    mockedJs.mkdtemp.mockResolvedValue("/temp/");
    const name: string = await createTempFile();
    expect(name).toBe("/temp/11-22.go");
  });
  it("temp file should be created if directory is given", async () => {
    const mockTmpDir = jest.spyOn(os, "tmpdir"); // spy on fs.readFileSync()
    mockTmpDir.mockImplementation(function () {
      return "temp";
    });
    const mockedUuid = uuid as jest.Mocked<typeof uuid>;
    mockedUuid.v4.mockImplementation(() => "ba-ge");
    const mockedJs = fs as jest.Mocked<typeof fs>;
    mockedJs.mkdtemp.mockResolvedValue("/temp/gtKK");
    const name: string = await createTempFile("go-", "new-temp", ".golang");
    expect(name).toBe("/temp/gtKK/ba-ge.golang");
    expect(mockTmpDir.mock.calls.length).toBe(0);
  });
  it("thrown error should be handled properly", async () => {
    const mockTmpDir = jest.spyOn(os, "tmpdir"); // spy on fs.readFileSync()
    mockTmpDir.mockImplementation(function () {
      return "temp";
    });
    const mockedLogger = logger as jest.Mocked<typeof logger>;
    const mockedUuid = uuid as jest.Mocked<typeof uuid>;
    mockedUuid.v4.mockImplementation(() => "ba-ge");
    const mockedJs = fs as jest.Mocked<typeof fs>;
    mockedJs.mkdtemp.mockRejectedValue(new Error("error occurred"));
    try {
      await createTempFile();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toContain("error occurred");
        expect(mockedLogger.error.mock.calls.length).toBe(1);
        expect(mockedLogger.error.mock.calls[0][0]).toContain(
          "An error occurred while creating temporary file:"
        );
      }
    }
  });
});
