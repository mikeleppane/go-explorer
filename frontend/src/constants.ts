export const apiBaseUrl =
  process.env.API_BASE_URL || "http://localhost:5000/api";
export const PORT = process.env.PORT || 3000;
export const BASE_URL =
  process.env.BASE_URL || `http://localhost:${PORT.toString()}/`;
export const appTimeout = 60;
