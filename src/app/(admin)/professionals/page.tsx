import { Plus, Search, CreditCard, Award, Building, Info } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui/base';
import Link from 'next/link';
import { getProfessionals } from '@/app/services/professional-service';

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profissionais</h1>
          <p className="text-slate-500">Gerencie o corpo clínico e técnico.</p>
        </div>
        <Link href="/professionals/new">
          <Button className="w-full md:w-auto gap-2">
            <Plus size={18} />
            Novo Profissional
          </Button>
        </Link>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar profissionais..." 
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* MOBILE LIST */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {professionals.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <Info className="mx-auto text-slate-300 mb-2" size={32} />
            <p>Nenhum profissional encontrado.</p>
          </Card>
        ) : (
          professionals.map((pro) => (
            <Card key={pro.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 leading-tight">{pro.fullName}</h3>
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                    <Building size={12} />
                    <span>{pro.clientName}</span>
                  </div>
                </div>
                <Badge variant={pro.active ? 'active' : 'inactive'}>
                  {pro.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CreditCard size={12} className="text-slate-400" />
                  <span>{pro.document}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={12} className="text-slate-400" />
                  <span>{pro.registrationNumber}</span>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600 uppercase font-bold">
                  {pro.professionalType}
                </span>
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
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Nome / Cliente</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Documento / Registro</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Tipo</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {professionals.map((pro) => (
                <tr key={pro.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{pro.fullName}</div>
                    <div className="text-xs text-blue-600">{pro.clientName}</div>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <div>{pro.document}</div>
                    <div className="text-xs text-slate-500">{pro.registrationNumber}</div>
                  </td>
                  <td className="px-6 py-4 uppercase font-bold text-[10px]">
                    <span className="bg-slate-100 px-2 py-1 rounded">{pro.professionalType}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={pro.active ? 'active' : 'inactive'}>
                      {pro.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
