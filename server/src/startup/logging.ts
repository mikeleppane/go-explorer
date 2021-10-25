import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
const transports = [
  new winston.transports.Console({
    format: winston.format.colorize({ all: true }),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    maxsize: 5242880,
    maxFiles: 5,
    format: winston.format.colorize({ all: false }),
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    maxsize: 15728640,
    maxFiles: 5,
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
