import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/form-components';
import ContractForm from '@/components/contracts/ContractForm';
import { createContractAction } from '@/app/actions/contract-actions';
import Link from 'next/link';

export default function NewContractPage() {
  // Bind null for creation (no ID needed in first param of createContractAction)
  const createAction = createContractAction.bind(null);

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
          <h1 className="text-2xl font-bold text-slate-900">Novo Contrato</h1>
          <p className="text-sm text-slate-500">Cadastre um novo contrato de serviço hospitalar e seus plantões.</p>
        </div>
      </div>

      <ContractForm 
        action={createAction} 
        submitLabel="Criar Contrato" 
      />
    </div>
  );
}
