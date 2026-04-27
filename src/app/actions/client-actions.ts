'use server'

import { Client } from "@/types/client";
import { ActionResponse } from "./contract-actions";

export async function createClientAction(
  prevState: ActionResponse | null,
  payload: Client
): Promise<ActionResponse> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/clients`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, message: errorData.message || "Failed to create client" };
    }

    return { success: true, message: "Cliente criado com sucesso!" };
  } catch {
    return { success: false, message: "Falha ao conectar com o servidor" };
  }
}
