import { create } from "apisauce";
import { apiBaseUrl } from "../constants";
import {
  BuildCodeResponse,
  BuildService,
  EnvInfoResponse,
  FormatService,
  LintService,
  RunCodeResponse,
  RunService,
  TestCodeResponse,
  TestService,
} from "../types";

const api = create({
  baseURL: apiBaseUrl,
  timeout: 60000,
});

const getInfo = async (version = "") => {
  const url = version ? `/info?version=${version}` : "/info";

  const response = await api.get<EnvInfoResponse>(url);
  if (response.ok) {
    console.log("getInfo> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("getInfo> problem: ", response.problem);
    if (response.data && "error" in response.data) {
      return response.data;
    }
    throw new Error(response.problem);
  }
};

const formatCode = async (data: FormatService) => {
  const response = await api.post("/format", data);
  if (response.ok) {
    console.log("formatCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("formatCode> problem: ", response.problem);
    throw new Error(response.problem);
  }
};

const lintCode = async (data: LintService) => {
  const response = await api.post("/lint", data);
  if (response.ok) {
    console.log("lintCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("lintCode> problem: ", response.problem);
    throw new Error(response.problem);
  }
};

const buildCode = async (data: BuildService, returnObjDump = false) => {
  const response = await api.post<BuildCodeResponse>(
    `${returnObjDump ? "/build?objdump=true" : "/build"}`,
    data
  );

  if (response.ok) {
    console.log("buildCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.error("buildCode> problem: ", response.problem);
    if (response.data && "error" in response.data) {
      return response.data;
    }
    throw new Error(response.problem);
  }
};

const runCode = async (data: RunService) => {
  const response = await api.post<RunCodeResponse>("/run", data);

  if (response.ok) {
    console.log("runCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.error("runCode> problem: ", response.problem);
    if (response.data && "error" in response.data) {
      return response.data;
    }
    throw new Error(response.problem);
  }
};

const testCode = async (data: TestService) => {
  const response = await api.post<TestCodeResponse>("/testing", data);

  if (response.ok) {
    console.log("testCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.error("testCode> problem: ", response.problem);
    if (response.data && "error" in response.data) {
      return response.data;
    }
    throw new Error(response.problem);
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
