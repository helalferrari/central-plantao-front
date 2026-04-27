import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui/base';
import { getContractById } from '@/app/services/contract-service';
import { getClients } from '@/app/services/client-service';
import ContractForm from '@/components/contracts/ContractForm';
import { updateContractAction } from '@/app/actions/contract-actions';
import { Contract } from '@/types/contract';
import { Client } from '@/types/client';
import Link from 'next/link';

export default async function EditContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let contract: Contract;
  let clients: Client[];

  try {
    const [contractRes, clientsRes] = await Promise.all([
      getContractById(id),
      getClients()
    ]);
    contract = contractRes;
    clients = clientsRes;
  } catch {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <Card className="p-12 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <AlertCircle size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Contrato não encontrado</h1>
            <p className="text-slate-500 text-balance max-w-md mx-auto">
              Não foi possível localizar o contrato com o ID #{id}. Ele pode ter sido removido ou o link está incorreto.
            </p>
          </div>
          <Link href="/contracts">
            <Button variant="primary">Voltar para a listagem</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const updateActionWithId = updateContractAction.bind(null, Number(id));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/contracts">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editar Contrato</h1>
          <p className="text-sm text-slate-500">Atualize as informações do contrato ID: #{id}</p>
        </div>
      </div>

      <ContractForm 
        initialData={contract} 
        clients={clients}
        action={updateActionWithId} 
        submitLabel="Salvar Alterações" 
      />
    </div>
  );
}
