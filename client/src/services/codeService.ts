import { create } from "apisauce";
import { apiBaseUrl } from "../constants";
import {
  BuildCodeParams,
  CodeParams,
  RunCodeParams,
  TestCodeParams,
} from "../types";

const api = create({
  baseURL: apiBaseUrl,
  timeout: 60000,
});

const getInfo = async () => {
  const response = await api.get("/info");
  if (response.ok) {
    console.log("getInfo> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("getInfo> problem: ", response.problem);
    return response;
  }
};

const formatCode = async (formatCodeParams: CodeParams) => {
  const response = await api.post("/format", formatCodeParams);
  if (response.ok) {
    console.log("formatCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("formatCode> problem: ", response.problem);
    return response;
  }
};

const lintCode = async (lintCodeParams: CodeParams) => {
  const response = await api.post("/lint", lintCodeParams);
  if (response.ok) {
    console.log("lintCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("lintCode> problem: ", response.problem);
    return response;
  }
};

const buildCode = async (
  buildCodeParams: BuildCodeParams,
  returnObjDump = false
) => {
  const response = await api.post(
    `${returnObjDump ? "/build?objdump=true" : "/build"}`,
    buildCodeParams
  );

  if (response.ok) {
    console.log("buildCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("buildCode> problem: ", response.problem);
    return response;
  }
};

const runCode = async (runCodeParams: RunCodeParams) => {
  const response = await api.post("/run", runCodeParams);

  if (response.ok) {
    console.log("runCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("runCode> problem: ", response.problem);
    return response;
  }
};

const testCode = async (testCodeParams: TestCodeParams) => {
  const response = await api.post("/testing", testCodeParams);

  if (response.ok) {
    console.log("testCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("testCode> problem: ", response.problem);
    return response;
  }
};

export default {
  getInfo,
  formatCode,
  lintCode,
  buildCode,
  runCode,
  testCode,
};
