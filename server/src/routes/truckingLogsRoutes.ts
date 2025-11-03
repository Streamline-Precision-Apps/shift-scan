import { Router } from "express";
import {
  createTruckingLogsController,
  deleteTruckingLogController,
  getTruckingLogsById,
  getTruckingLogsController,
  updateTruckingLogsController,
} from "../controllers/truckingLogsController.js";
const router = Router();

router.get("/user/:userId", getTruckingLogsController);
router.get("/:id", getTruckingLogsById);
router.post("/:id", createTruckingLogsController);

router.put("/:id", updateTruckingLogsController);

router.delete("/:id", deleteTruckingLogController);

export default router;
