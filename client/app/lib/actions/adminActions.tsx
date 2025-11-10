"use client";
import { apiRequest } from "@/app/lib/utils/api-Utils";

export async function createCrew(formData: FormData) {
  try {
    // Extract data from formData
    const crewName = formData.get("name") as string;
    const Users = formData.get("Users") as string;
    const teamLead = formData.get("leadId") as string;
    const crewType = formData.get("crewType") as string;

    if (!crewName || !crewName.trim()) {
      throw new Error("Crew name is required.");
    }
    if (!Users) {
      throw new Error("Crew members data is missing.");
    }
    if (!teamLead) {
      throw new Error("A team lead is required.");
    }

    // Call API to create crew
    const result = await apiRequest(
      "/api/v1/admins/personnel/createCrew",
      "POST",
      {
        name: crewName.trim(),
        leadId: teamLead,
        crewType,
        Users,
      }
    );

    return {
      success: true,
      crewId: result.crewId,
      message: "Crew created successfully",
    };
  } catch (error) {
    console.error("Error creating crew:", error);
    throw new Error(
      `Failed to create crew: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function createUserAdmin(payload: {
  terminationDate: Date | null;
  createdById: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  password: string;
  permission: string;
  truckView: boolean;
  tascoView: boolean;
  mechanicView: boolean;
  laborView: boolean;
  crews: {
    id: string;
  }[];
}) {
  try {
    console.log("Payload in createUserAdmin:", payload);
    // Call API to create user
    const result = await apiRequest(
      "/api/v1/admins/personnel/createUserAdmin",
      "POST",
      {
        ...payload,
        terminationDate: payload.terminationDate?.toISOString() || null,
      }
    );

    return { success: true, userId: result.userId };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(
      `Failed to create user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function editCrew(formData: FormData) {
  try {
    // Extract data from formData
    const crewName = formData.get("name") as string;
    const Users = formData.get("Users") as string;
    const teamLead = formData.get("leadId") as string;
    const crewType = formData.get("crewType") as string;
    const crewId = formData.get("id") as string;

    if (!crewName || !crewName.trim()) {
      throw new Error("Crew name is required.");
    }
    if (!Users) {
      throw new Error("Crew members data is missing.");
    }
    if (!teamLead) {
      throw new Error("A team lead is required.");
    }

    // Call API to update crew
    const result = await apiRequest(
      `/api/v1/admins/personnel/editCrew/${crewId}`,
      "PUT",
      {
        name: crewName.trim(),
        leadId: teamLead,
        crewType,
        Users,
      }
    );

    return {
      success: true,
      crewId: result.crewId,
      message: "Crew updated successfully",
    };
  } catch (error) {
    console.error("Error updating crew:", error);
    throw new Error(
      `Failed to update crew: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function editUserAdmin(payload: {
  id: string;
  terminationDate: string | null;
  username: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;
  permission: string;
  truckView: boolean;
  tascoView: boolean;
  mechanicView: boolean;
  laborView: boolean;
  crews: {
    id: string;
  }[];
}) {
  try {
    console.log("Payload in editUserAdmin:", payload);
    // Call API to update user
    const result = await apiRequest(
      `/api/v1/admins/personnel/editUserAdmin/${payload.id}`,
      "PUT",
      {
        ...payload,
      }
    );

    return { success: true, userId: result.userId };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(
      `Failed to update user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deleteCrew(id: string) {
  try {
    await apiRequest(`/api/v1/admins/personnel/deleteCrew/${id}`, "DELETE");
    return { success: true };
  } catch (error) {
    console.error("Error deleting crew:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await apiRequest(`/api/v1/admins/personnel/deleteUser/${id}`, "DELETE");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
