'use server'

import { ActionResponse } from "./contract-actions";

export async function generateSlotsAction(
  contractId: number,
  year: number,
  month: number
): Promise<ActionResponse> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/slots/generate?contractId=${contractId}&year=${year}&month=${month}`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return { success: false, message: "Falha ao gerar vagas para o período." };
    }

    return { success: true, message: "Vagas geradas com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}
