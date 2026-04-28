'use client'

import { useTransition, useState } from 'react';
import { Calendar, Plus, User, Building, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card } from '@/components/ui/base';
import { Slot } from '@/types/slot';
import { Contract } from '@/types/contract';
import { generateSlotsAction } from '@/app/actions/slot-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ScheduleClientProps {
  contract: Contract;
  initialSlots: Slot[];
  year: number;
  month: number;
}

export default function ScheduleClient({ contract, initialSlots, year: initialYear, month: initialMonth }: ScheduleClientProps) {
  const [isPending, startTransition] = useTransition();
  const [currentDate, setCurrentDate] = useState(new Date(initialYear, initialMonth - 1));
  const router = useRouter();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Group slots by day
  const groupedSlots = initialSlots.reduce((acc: { [key: string]: Slot[] }, slot) => {
    const dateKey = new Date(slot.startTime).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      weekday: 'long'
    });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {});

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateSlotsAction(Number(contract.id), currentYear, currentMonth);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
    router.push(`/contracts/${contract.id}/schedule?year=${newDate.getFullYear()}&month=${newDate.getMonth() + 1}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'FILLED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">{contract.description}</h1>
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
            <Building size={16} />
            <span>{contract.client?.tradeName}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-200 transition-colors border-r border-slate-200">
              <ChevronLeft size={18} />
            </button>
            <div className="px-4 py-2 text-sm font-bold text-slate-700 min-w-[140px] text-center uppercase">
              {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </div>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-200 transition-colors border-l border-slate-200">
              <ChevronRight size={18} />
            </button>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            isLoading={isPending}
            variant="primary"
            className="gap-2"
          >
            <Plus size={18} />
            Gerar Escala
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.keys(groupedSlots).length === 0 ? (
          <Card className="p-20 text-center space-y-4">
            <Calendar className="mx-auto text-slate-200" size={48} />
            <div className="space-y-1">
              <p className="text-slate-900 font-bold">Nenhuma vaga gerada para este mês.</p>
              <p className="text-sm text-slate-500 text-balance max-w-xs mx-auto">
                Certifique-se de que o contrato está ativo e inicia antes do fim do mês selecionado.
              </p>
            </div>
          </Card>
        ) : (
          Object.entries(groupedSlots).map(([date, slots]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                  {date}
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                  <Card key={slot.id} className="p-4 hover:shadow-md transition-shadow border-slate-200 relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1 h-full ${slot.status === 'OPEN' ? 'bg-blue-500' : 'bg-green-500'}`} />
                    
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold">
                        <Clock size={16} className="text-slate-400" />
                        <span>
                          {new Date(slot.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(slot.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusColor(slot.status)}`}>
                        {slot.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Building size={14} className="text-slate-400" />
                        <span className="font-medium">{slot.sectorDescription}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <User size={14} className="text-slate-400" />
                        <span>{slot.professionalName || `Vaga para ${slot.professionalType}`}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      {slot.status === 'OPEN' ? (
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full md:w-auto">
                          Vincular Profissional
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                          <CheckCircle2 size={14} />
                          <span>Preenchida</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
