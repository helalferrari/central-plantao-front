import { Professional } from "@/types/professional";

export async function getProfessionals(): Promise<Professional[]> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/professionals`;
  
  try {
    const response = await fetch(backendUrl, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error("Failed to fetch professionals");
    return await response.json();
  } catch (error) {
    console.error("[PROFESSIONAL-SERVICE] - Error:", error);
    return [];
  }
}
