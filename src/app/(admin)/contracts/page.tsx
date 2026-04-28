import { Plus, Search, Pencil, Calendar, Info, MoreVertical } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui/base';
import Link from 'next/link';
import { getContracts } from '@/app/services/contract-service';

export default async function ContractsPage() {
  const contracts = await getContracts().catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contratos</h1>
          <p className="text-slate-500">Gerencie contratos de serviços hospitalares e definições de plantão.</p>
        </div>
        <Link href="/contracts/new">
          <Button className="w-full md:w-auto gap-2">
            <Plus size={18} />
            Novo Contrato
          </Button>
        </Link>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar contratos..." 
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* MOBILE LIST (Cards) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contracts.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <Info className="mx-auto text-slate-300 mb-2" size={32} />
            <p>Nenhum contrato encontrado.</p>
          </Card>
        ) : (
          contracts.map((contract) => (
            <Card key={contract.id} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 leading-tight">{contract.description}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-medium">
                    <span>{contract.client?.tradeName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={12} />
                    <span>{new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <Badge variant={contract.active ? 'active' : 'inactive'}>
                  {contract.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <Link href={`/contracts/${contract.id}/schedule`}>
                  <Button variant="outline" size="sm" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
                    <Calendar size={14} />
                    Agenda
                  </Button>
                </Link>
                <Link href={`/contracts/edit/${contract.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pencil size={14} />
                    Editar
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Descrição / Cliente</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Período</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {contracts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Nenhum contrato encontrado.
                  </td>
                </tr>
              ) : (
                contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{contract.description}</div>
                      <div className="text-xs text-blue-600">{contract.client?.tradeName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={contract.active ? 'active' : 'inactive'}>
                        {contract.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/contracts/${contract.id}/schedule`}>
                          <Button variant="ghost" size="sm" title="Ver Agenda">
                            <Calendar size={18} className="text-slate-400 hover:text-green-600" />
                          </Button>
                        </Link>
                        <Link href={`/contracts/edit/${contract.id}`}>
                          <Button variant="ghost" size="sm" title="Editar">
                            <Pencil size={18} className="text-slate-400 hover:text-blue-600" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="Mais opções">
                          <MoreVertical size={18} className="text-slate-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
