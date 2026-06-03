import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Application, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Logger } from "pino";
import router from "./routes";
import { logger } from "./lib/logger";

function resolveStaticDir(): string | null {
  if (process.env.VERCEL || process.env.SERVE_STATIC !== "1") {
    return null;
  }

  const distDir = path.dirname(fileURLToPath(import.meta.url));
  const staticDir = path.resolve(distDir, "../../crypto-dashboard/dist/public");
  const indexPath = path.join(staticDir, "index.html");

  return existsSync(indexPath) ? staticDir : null;
}

const app: Application = express();

const isVercel = Boolean(process.env.VERCEL);

if (isVercel) {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.log = logger as Logger;
    next();
  });
} else {
  app.use(
    pinoHttp({
      logger,
      serializers: {
        req(req: IncomingMessage & { id?: number | string }) {
          return {
            id: req.id,
            method: req.method,
            url: req.url?.split("?")[0],
          };
        },
        res(res: ServerResponse) {
          return {
            statusCode: res.statusCode,
          };
        },
      },
    }),
  );
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const staticDir = resolveStaticDir();
if (staticDir) {
  app.use(express.static(staticDir));
  app.get(/^(?!\/api(?:\/|$)).*/, (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }
    res.sendFile(path.join(staticDir, "index.html"));
  });
  logger.info({ staticDir }, "Serving dashboard static assets");
}

export default app;
