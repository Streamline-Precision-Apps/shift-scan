
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a2c9c6cb-0345-5e2d-ab4b-17457105376b")}catch(e){}}();
import { Router } from "express";
import { getCostCodesController, archiveCostCodeController, createCostCodeController, deleteCostCodeController, getCostCodeByIdController, restoreCostCodeController, updateCostCodeController, getCostCodeSummaryController, } from "../controllers/adminCostCodeController.js";
const router = Router();
// /api/v1/admins/cost-codes - get all cost codes
router.get("/", getCostCodesController);
// /api/v1/admins/cost-codes/:id - get all cost codes
router.get("/:id", getCostCodeByIdController);
// /api/v1/admins/cost-codes/summary - get cost code summary
router.get("/summary", getCostCodeSummaryController);
// /api/v1/admins/cost-codes/ - create cost code
router.post("/", createCostCodeController);
// /api/v1/admins/cost-codes/:id - update cost code
router.put("/:id", updateCostCodeController);
// /api/v1/admins/cost-codes/:id/archive - archive cost code
router.put("/:id/archive", archiveCostCodeController);
// /api/v1/admins/cost-codes/:id/restore - restore cost code
router.put("/:id/restore", restoreCostCodeController);
// /api/v1/admins/cost-codes/:id - delete cost code
router.delete("/:id", deleteCostCodeController);
export default router;
//# sourceMappingURL=adminsCostCodesRoutes.js.map
//# debugId=a2c9c6cb-0345-5e2d-ab4b-17457105376b
