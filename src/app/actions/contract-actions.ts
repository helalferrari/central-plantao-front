'use server'

import { Contract } from "@/types/contract";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function createContractAction(
  prevState: ActionResponse | null,
  payload: Contract
): Promise<ActionResponse> {
  console.log("[SERVER-ACTION] - Sending contract to backend...");
  
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/contracts`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[SERVER-ACTION] - Backend error:", errorData);
      return {
        success: false,
        message: errorData.message || `API Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log("[SERVER-ACTION] - Contract successfully created in backend.");
    
    return {
      success: true,
      message: "Contrato criado com sucesso!",
      data,
    };
  } catch (error) {
    console.error("[SERVER-ACTION] - Network/Unexpected error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Falha ao conectar com o servidor",
    };
  }
}

export async function updateContractAction(
  id: number,
  prevState: ActionResponse | null,
  payload: Contract
): Promise<ActionResponse> {
  console.log(`[SERVER-ACTION] - Updating contract ID: ${id} in backend...`);
  
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/contracts/${id}`;

  try {
    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || `API Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log(`[SERVER-ACTION] - Contract ID: ${id} successfully updated.`);
    
    return {
      success: true,
      message: "Contrato atualizado com sucesso!",
      data,
    };
  } catch (error) {
    console.error(`[SERVER-ACTION] - Error updating contract ID: ${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Falha ao conectar com o servidor",
    };
  }
}
