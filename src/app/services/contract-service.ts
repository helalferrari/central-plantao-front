import { Contract } from "@/types/contract";

export async function getContracts(): Promise<Contract[]> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/contracts`;
  
  console.log(`[SERVER-FETCH] - Fetching contracts from backend: ${backendUrl}`);

  try {
    const response = await fetch(backendUrl, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contracts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[SERVER-FETCH] - Successfully fetched ${data.length} contracts.`);
    return data;
  } catch (error) {
    console.error("[SERVER-FETCH] - Error fetching contracts:", error);
    throw error;
  }
}

export async function getContractById(id: string): Promise<Contract> {
  const backendUrl = `${process.env.BACKEND_URL}/api/v1/contracts/${id}`;
  
  console.log(`[SERVER-FETCH] - Fetching contract ID: ${id} from backend`);

  try {
    const response = await fetch(backendUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contract: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[SERVER-FETCH] - Successfully fetched contract ID: ${id}.`);
    return data;
  } catch (error) {
    console.error(`[SERVER-FETCH] - Error fetching contract ID: ${id}:`, error);
    throw error;
  }
}
