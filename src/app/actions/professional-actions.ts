'use server'

import { Professional } from "@/types/professional";
import { ActionResponse } from "./contract-actions";

export async function createProfessionalAction(
  prevState: ActionResponse | null,
  payload: Professional
): Promise<ActionResponse> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/professionals`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, message: errorData.message || "Failed to create professional" };
    }

    return { success: true, message: "Profissional criado com sucesso!" };
  } catch {
    return { success: false, message: "Falha ao conectar com o servidor" };
  }
}
