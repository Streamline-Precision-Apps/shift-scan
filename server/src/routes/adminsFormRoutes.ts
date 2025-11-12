import { Router } from "express";

const router = Router();

import { getAllFormTemplatesController } from "../controllers/adminFormController.js";

// GET /api/v1/admins/forms/template
router.get("/template", getAllFormTemplatesController);

router.get("/template/:id", (req, res) => {
  console.log("GET /template/:id - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); // get form template by id

router.put("/template/:id", (req, res) => {
  console.log("PUT /template/:id - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); // update form template by id

router.put("/template/:id/archive", (req, res) => {
  console.log("PUT /template/:id/archive - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); // archive form template by id

router.put("/template/:id/publish", (req, res) => {
  console.log("PUT /template/:id/publish - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); // publish form template by id

router.get("/template/:id/submissions", (req, res) => {
  console.log("GET /template/:id/submissions - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); //  get all form submissions by template id

router.get("/template/:id/submission/:id", (req, res) => {
  console.log("GET /template/:id/submission/:id - Not implemented");
  res.status(501).json({ error: "Not implemented" });
}); //  gets a form submission by id

export default router;
