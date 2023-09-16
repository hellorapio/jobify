import express from "express";
import workerController from "./worker.controller";
const router = express.Router();

router.route("/:workerId").get(workerController.getWorker);

export default router;
