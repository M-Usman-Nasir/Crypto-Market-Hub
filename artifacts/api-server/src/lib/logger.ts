import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = Boolean(process.env.VERCEL);

const baseOptions = {
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
};

// Sync stdout only — worker threads / pino-pretty break on Vercel serverless
export const logger =
  isVercel || isProduction
    ? pino(baseOptions, pino.destination({ dest: 1, sync: true }))
    : pino({
        ...baseOptions,
        transport: {
          target: "pino-pretty",
          options: { colorize: true },
        },
      });
