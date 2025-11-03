import { Router } from "express";
import {
  getMechanicLogsController,
  createMechanicProjectController,
  updateMechanicProjectController,
  deleteMechanicProjectController,
  getMechanicLogController,
} from "../controllers/mechanicLogsController.js";

const router = Router();

router.get("/timesheet/:timesheetId", getMechanicLogsController);
router.get("/:id", getMechanicLogController);
router.post("/", createMechanicProjectController);
router.put("/:id", updateMechanicProjectController);
router.delete("/:id", deleteMechanicProjectController);

export default router;
