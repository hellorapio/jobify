import { Router } from "express";
import WorkerController from "./worker.controller";

const router = Router();

router.route("/:workerId").get(WorkerController.getWorker);

export default router;
