import type { Request, Response } from "express";
import { getAllFormTemplates } from "../services/adminFormService.js";

// GET /api/v1/admins/forms/template
export async function getAllFormTemplatesController(
  req: Request,
  res: Response
) {
  try {
    // status and formType can be arrays or strings
    const status = Array.isArray(req.query.status)
      ? (req.query.status as string[])
      : req.query.status
      ? [req.query.status as string]
      : [];
    const formType = Array.isArray(req.query.formType)
      ? (req.query.formType as string[])
      : req.query.formType
      ? [req.query.formType as string]
      : [];
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string, 10)
      : 10;
    const skip = (page - 1) * pageSize;

    const result = await getAllFormTemplates(
      search,
      page,
      pageSize,
      skip,
      status,
      formType
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch form templates",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
