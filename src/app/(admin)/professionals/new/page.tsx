import { getClients } from "@/app/services/client-service";
import NewProfessionalForm from "./ProfessionalForm";

export default async function NewProfessionalPage() {
  const clients = await getClients();

  return <NewProfessionalForm clients={clients} />;
}
