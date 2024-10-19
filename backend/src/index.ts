require("dotenv").config();
require("express-async-errors");

import cors from "cors";
import express from "express";
import * as cron from "node-cron";
import { docs } from "./api/middleware/docs.middleware";
import { handleError } from "./api/middleware/error.middleware";
import {
  logRequestMiddleware,
  logResponseMiddleware,
} from "./api/middleware/log.middleware";
import { RegisterRoutes } from "./api/routes/routes";
import { initializeServices } from "./service/domain/_service.config";
import WinstonLogger from "./util/LogUtil";

async function initialize() {
  // Initialize
  await initializeServices();
  const app = express();

  // Pre-route middleware (keep this before RegisterRoutes)
  app.use(logRequestMiddleware);
  app.use(logResponseMiddleware);

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));

  // Routes
  RegisterRoutes(app);

  // Middleware (the rest of the middleware)
  app.use(docs);
  // @ts-ignore
  app.use(handleError);

  // Schedule jobs (daily at midnight)
  cron.schedule("0 0 * * *", () => {
    // TODO: Purge outdated data
  });

  // Start
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    const logger = WinstonLogger.getInstance().getLogger("Server");
    logger.info(`Server is running on port ${port}`);
  });
}
initialize();
