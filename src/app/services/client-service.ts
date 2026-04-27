import { Client } from "@/types/client";

export async function getClients(): Promise<Client[]> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/clients`;
  
  try {
    const response = await fetch(backendUrl, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error("Failed to fetch clients");
    return await response.json();
  } catch (error) {
    console.error("[CLIENT-SERVICE] - Error:", error);
    return [];
  }
}
