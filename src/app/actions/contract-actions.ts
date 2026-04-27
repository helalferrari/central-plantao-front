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
  console.log(`[FRONT] - Processing creation for Client ID: ${payload.clientId}`);
  
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
      return {
        success: false,
        message: errorData.message || `API Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: "Contrato criado com sucesso!",
      data,
    };
  } catch (error) {
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
  console.log(`[FRONT] - Processing update for Contract ID: ${id} (Client ID: ${payload.clientId})`);
  
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
    return {
      success: true,
      message: "Contrato atualizado com sucesso!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Falha ao conectar com o servidor",
    };
  }
}
