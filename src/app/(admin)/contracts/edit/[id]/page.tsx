'use client'

import { useRouter, useParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button, FormInput, FormSelect, FormSection } from '@/components/ui/form-components';
import { Card } from '@/components/ui/base';
import { toast } from 'sonner';
import { ProfessionalType, ScheduleType, Workload, Contract } from '@/types/contract';
import { updateContractAction } from '@/app/actions/contract-actions';
import { getContractById } from '@/app/services/contract-service';
import { useActionState, useEffect, startTransition, useState, useCallback } from 'react';

// --- VALIDATION SCHEMA ---
const shiftSchema = z.object({
  sectorDescription: z.string().min(1, 'O setor é obrigatório'),
  professionalType: z.enum(['PEDIATRICIAN', 'OBSTETRICIAN_GYNECOLOGIST', 'GENERAL_PRACTITIONER', 'NURSE', 'NURSING_TECHNICIAN']),
  scheduleType: z.enum(['SHIFT_12X36', 'SHIFT_24X48', 'SHIFT_6X1', 'SHIFT_5X2', 'SHIFT_4X3']),
  slotQuantity: z.number().min(1, 'Mínimo de 1 posto'),
  workload: z.enum(['W12', 'W24']),
});

const contractSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  active: z.boolean(),
  contractedShifts: z.array(shiftSchema).min(1, 'Pelo menos um plantão é obrigatório'),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "A data de término não pode ser anterior à data de início",
  path: ["endDate"],
});

type ContractFormValues = z.infer<typeof contractSchema>;

export default function EditContractPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [initialData, setInitialData] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bind the ID to the action
  const updateActionWithId = updateContractAction.bind(null, Number(id));
  const [state, formAction, isPending] = useActionState(updateActionWithId, null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contractedShifts',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getContractById(id);
      setInitialData(data);
      reset({
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        active: data.active,
        contractedShifts: data.contractedShifts,
      });
    } catch (error) {
      toast.error("Erro ao carregar dados do contrato");
      router.push('/contracts');
    } finally {
      setIsLoading(false);
    }
  }, [id, reset, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push('/contracts');
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  const onSubmit = (data: ContractFormValues) => {
    startTransition(() => {
      formAction(data as any);
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          type="button"
          onClick={() => router.back()}
          className="rounded-full w-10 h-10 p-0"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editar Contrato</h1>
          <p className="text-sm text-slate-500">Atualize as informações do contrato ID: #{id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FormSection title="Informações Gerais" description="Detalhes básicos sobre a entidade contratante e o período.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Nome do Contrato" 
              placeholder="ex: Hospital Santa Casa"
              className="md:col-span-2"
              error={errors.name?.message}
              {...register('name')}
            />
            <FormInput 
              label="Data de Início" 
              type="date"
              error={errors.startDate?.message}
              {...register('startDate')}
            />
            <FormInput 
              label="Data de Término" 
              type="date"
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>
        </FormSection>

        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Plantões Contratados</h2>
              <p className="text-sm text-slate-500">Defina as escalas e postos para este contrato.</p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => append({ 
                sectorDescription: '', 
                slotQuantity: 1, 
                workload: 'W12', 
                professionalType: 'GENERAL_PRACTITIONER', 
                scheduleType: 'SHIFT_12X36' 
              })}
              className="gap-2"
            >
              <Plus size={16} />
              Adicionar Posto
            </Button>
          </div>
          
          {errors.contractedShifts?.root?.message && (
            <p className="text-sm text-red-500 font-medium">{errors.contractedShifts.root.message}</p>
          )}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="p-6 relative group border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pr-10">
                  <FormInput 
                    label="Setor" 
                    placeholder="ex: UTI"
                    error={errors.contractedShifts?.[index]?.sectorDescription?.message}
                    {...register(`contractedShifts.${index}.sectorDescription`)}
                  />
                  <FormSelect 
                    label="Profissional" 
                    options={[
                      { label: 'Pediatra', value: 'PEDIATRICIAN' },
                      { label: 'Ginecologista/Obstetra', value: 'OBSTETRICIAN_GYNECOLOGIST' },
                      { label: 'Clínico Geral', value: 'GENERAL_PRACTITIONER' },
                      { label: 'Enfermeiro', value: 'NURSE' },
                      { label: 'Técnico de Enfermagem', value: 'NURSING_TECHNICIAN' },
                    ]}
                    error={errors.contractedShifts?.[index]?.professionalType?.message}
                    {...register(`contractedShifts.${index}.professionalType`)}
                  />
                  <FormSelect 
                    label="Escala" 
                    options={[
                      { label: '12x36', value: 'SHIFT_12X36' },
                      { label: '24x48', value: 'SHIFT_24X48' },
                      { label: '6x1', value: 'SHIFT_6X1' },
                      { label: '5x2', value: 'SHIFT_5X2' },
                      { label: '4x3', value: 'SHIFT_4X3' },
                    ]}
                    error={errors.contractedShifts?.[index]?.scheduleType?.message}
                    {...register(`contractedShifts.${index}.scheduleType`)}
                  />
                  <FormInput 
                    label="Postos" 
                    type="number"
                    error={errors.contractedShifts?.[index]?.slotQuantity?.message}
                    {...register(`contractedShifts.${index}.slotQuantity`, { valueAsNumber: true })}
                  />
                  <FormSelect 
                    label="Carga Horária" 
                    options={[
                      { label: '12h', value: 'W12' },
                      { label: '24h', value: 'W24' },
                    ]}
                    error={errors.contractedShifts?.[index]?.workload?.message}
                    {...register(`contractedShifts.${index}.workload`)}
                  />
                </div>
                
                {fields.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isPending} className="px-8">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
