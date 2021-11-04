import { create } from "apisauce";
import { apiBaseUrl } from "../constants";

const api = create({
  baseURL: apiBaseUrl,
});

const getInfo = async () => {
  const response = await api.get("/info");
  if (response.ok) {
    console.log("getInfo> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("getInfo> problem: ", response.problem);
    return response.problem;
  }
};

const formatCode = async (code: string, version?: string) => {
  let reqObj;
  if (version) {
    reqObj = { code, version };
  } else {
    reqObj = { code };
  }
  const response = await api.post("/format", reqObj);
  if (response.ok) {
    console.log("formatCode> ok");
    return response.data;
  }
  if (response.problem) {
    console.log("formatCode> problem: ", response.problem);
    return response.problem;
  }
};

export default {
  getInfo,
  formatCode,
};
