import { getSlots } from "@/app/services/slot-service";
import { getContractById } from "@/app/services/contract-service";
import ScheduleClient from "./ScheduleClient";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ year?: string; month?: string }>;
}

export default async function ContractSchedulePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { year: queryYear, month: queryMonth } = await searchParams;
  
  const now = new Date();
  const year = queryYear ? parseInt(queryYear) : now.getFullYear();
  const month = queryMonth ? parseInt(queryMonth) : now.getMonth() + 1;

  const [contract, slots] = await Promise.all([
    getContractById(id),
    getSlots(id, year, month)
  ]);

  return (
    <ScheduleClient 
      contract={contract} 
      initialSlots={slots} 
      year={year} 
      month={month} 
    />
  );
}
