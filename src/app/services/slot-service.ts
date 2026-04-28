import { Slot } from "@/types/slot";

export async function getSlots(contractId: string, year: number, month: number): Promise<Slot[]> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/slots?contractId=${contractId}&year=${year}&month=${month}`;
  
  try {
    const response = await fetch(backendUrl, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error("Failed to fetch slots");
    return await response.json();
  } catch (error) {
    console.error("[SLOT-SERVICE] - Error fetching slots:", error);
    return [];
  }
}
