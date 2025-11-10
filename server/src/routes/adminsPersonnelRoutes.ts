import { Router } from "express";
import {
  createCrewController,
  createUserAdminController,
  deleteCrewController,
  deleteUserController,
  editCrewController,
  editUserAdminController,
  getAllCrewsController,
  getCrewByIdAdminController,
  getCrewEmployeesController,
  getCrewManagersController,
  getEmployeeInfoController,
  getPersonnelManagerController,
} from "../controllers/adminPersonnelController.js";

const router = Router();

// get all users in crew
router.get("/getAllEmployees", getCrewEmployeesController);
// get all crews
router.get("/getAllCrews", getAllCrewsController);
// get employee Info by id
router.get("/getEmployeeInfo/:id", getEmployeeInfoController);
// get crew Info by id
router.get("/getCrewByIdAdmin/:id", getCrewByIdAdminController);
// get all crew managers
router.get("/crewManagers", getCrewManagersController);

router.get("/personnelManager", getPersonnelManagerController);

// create crew
router.post("/createCrew", createCrewController);
// edit crew
router.put("/editCrew/:id", editCrewController);
// delete crew
router.delete("/deleteCrew/:id", deleteCrewController);

// create user (admin)
router.post("/createUserAdmin", createUserAdminController);
// edit user (admin)
router.put("/editUserAdmin/:id", editUserAdminController);
// delete user (admin)
router.delete("/deleteUser/:id", deleteUserController);

export default router;
