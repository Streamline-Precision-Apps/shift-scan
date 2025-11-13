
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e0ddcc19-8e4f-5b07-8357-b0f32eb5a016")}catch(e){}}();
import { getTascoReport as getTascoReportService, getTruckingReport as getTruckingReportService, getMechanicReport as getMechanicReportService, } from "../services/adminsReportService.js";
export async function getTascoReport(req, res) {
    try {
        const data = await getTascoReportService();
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch Tasco report",
            error: error instanceof Error ? error.message : error,
        });
    }
}
export async function getTruckingReport(req, res) {
    try {
        const data = await getTruckingReportService();
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch Trucking report",
            error: error instanceof Error ? error.message : error,
        });
    }
}
export async function getMechanicReport(req, res) {
    try {
        const data = await getMechanicReportService();
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch Mechanic report",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=adminReportController.js.map
//# debugId=e0ddcc19-8e4f-5b07-8357-b0f32eb5a016
