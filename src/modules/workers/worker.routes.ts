import { Router } from "express";
import workerController from "./worker.controller";
const router = Router();

router.route("/:workerId").get(workerController.getWorker);

export default router;
