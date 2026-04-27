import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/form-components';
import { getContractById } from '@/app/services/contract-service';
import ContractForm from '@/components/contracts/ContractForm';
import { updateContractAction } from '@/app/actions/contract-actions';
import Link from 'next/link';

export default async function EditContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contract = await getContractById(id);

  // Bind the ID to the server action
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
        action={updateActionWithId} 
        submitLabel="Salvar Alterações" 
      />
    </div>
  );
}
