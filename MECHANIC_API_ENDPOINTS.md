# Mechanic Logs API Endpoints

## Overview
All mechanic project endpoints are prefixed with `/api/v1/mechanic-logs`.

## Endpoints

### GET - Fetch all projects for a timesheet
**Endpoint:** `GET /api/v1/mechanic-logs/timesheet/:timesheetId`

**Response:**
- **Success (200):** Returns array of projects
  ```json
  [
    {
      "id": 1,
      "equipmentId": "eq-001",
      "description": "Engine maintenance",
      "hours": 2.5,
      "Equipment": {
        "id": "eq-001",
        "name": "Truck #1"
      }
    }
  ]
  ```
- **No Content (204):** No projects found for the timesheet
- **Error (400):** Missing timesheetId parameter
- **Error (500):** Server error

---

### POST - Create a new project
**Endpoint:** `POST /api/v1/mechanic-logs/`

**Request Body:**
```json
{
  "timeSheetId": 328,
  "equipmentId": "eq-001",
  "hours": 2.5,
  "description": "Engine maintenance"
}
```

**Required Fields:** `timeSheetId`, `equipmentId`

**Optional Fields:** `hours` (default: 0), `description` (default: "")

**Response:**
- **Success (201):** Returns created project
  ```json
  {
    "id": 5,
    "timeSheetId": 328,
    "equipmentId": "eq-001",
    "hours": 2.5,
    "description": "Engine maintenance"
  }
  ```
- **Error (400):** Missing required fields
- **Error (500):** Server error

---

### PUT - Update a project
**Endpoint:** `PUT /api/v1/mechanic-logs/:id`

**Request Body:**
```json
{
  "equipmentId": "eq-002",
  "hours": 3,
  "description": "Updated maintenance"
}
```

**Optional Fields:** `equipmentId`, `hours`, `description`

**Response:**
- **Success (200):** Returns updated project
  ```json
  {
    "id": 5,
    "timeSheetId": 328,
    "equipmentId": "eq-002",
    "hours": 3,
    "description": "Updated maintenance"
  }
  ```
- **Error (400):** Missing project ID
- **Error (500):** Server error

---

### DELETE - Delete a project
**Endpoint:** `DELETE /api/v1/mechanic-logs/:id`

**Response:**
- **Success (204):** No content - project deleted successfully
- **Error (400):** Missing project ID
- **Error (500):** Server error

---

## Frontend Usage

All frontend actions now use the `apiRequest` utility with these endpoints:

```tsx
// Create
await apiRequest("/api/v1/mechanic-logs", "POST", {
  timeSheetId,
  equipmentId,
  hours,
  description,
});

// Update
await apiRequest(`/api/v1/mechanic-logs/${id}`, "PUT", {
  equipmentId,
  hours,
  description,
});

// Delete
await apiRequest(`/api/v1/mechanic-logs/${id}`, "DELETE");
```

## Files Updated

**Backend:**
- `/server/src/controllers/mechanicLogsController.ts` - Added create, update, delete controllers
- `/server/src/services/mechanicService.ts` - Added create, update, delete service functions
- `/server/src/routes/mechanicLogsRoutes.ts` - Registered new endpoints

**Frontend:**
- `/client/app/lib/actions/mechanicActions.tsx` - Converted createProject, updateProject, deleteProject to use apiRequest
- `/client/app/v1/(routes)/dashboard/mechanic/_components/mechanic-display-list.tsx` - Already calls these actions
