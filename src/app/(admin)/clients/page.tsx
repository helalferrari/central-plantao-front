import { Plus, Search, Mail, Phone, Info } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui/base';
import Link from 'next/link';
import { getClients } from '@/app/services/client-service';

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500">Gerencie as entidades contratantes.</p>
        </div>
        <Link href="/clients/new">
          <Button className="w-full md:w-auto gap-2">
            <Plus size={18} />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar clientes..." 
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* MOBILE LIST */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {clients.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <Info className="mx-auto text-slate-300 mb-2" size={32} />
            <p>Nenhum cliente encontrado.</p>
          </Card>
        ) : (
          clients.map((client) => (
            <Card key={client.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 leading-tight">{client.tradeName}</h3>
                  <p className="text-xs text-slate-500">{client.corporateName}</p>
                </div>
                <Badge variant={client.active ? 'active' : 'inactive'}>
                  {client.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-slate-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-slate-400" />
                  <span>{client.phone}</span>
                </div>
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
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Razão Social / Nome Fantasia</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Documento</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs">Contato</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{client.tradeName}</div>
                    <div className="text-xs text-slate-500">{client.corporateName}</div>
                  </td>
                  <td className="px-6 py-4 font-mono">{client.document}</td>
                  <td className="px-6 py-4">
                    <div>{client.email}</div>
                    <div className="text-xs text-slate-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={client.active ? 'active' : 'inactive'}>
                      {client.active ? 'Ativo' : 'Inativo'}
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
