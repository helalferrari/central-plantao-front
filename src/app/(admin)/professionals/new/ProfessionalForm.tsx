'use client'

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button, FormInput, FormSelect, FormSection } from '@/components/ui/form-components';
import { toast } from 'sonner';
import { useActionState, useEffect, startTransition } from 'react';
import { createProfessionalAction } from '@/app/actions/professional-actions';
import { Client } from '@/types/client';
import { Professional } from '@/types/professional';
import Link from 'next/link';

const professionalSchema = z.object({
  fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  document: z.string().min(11, 'O documento deve ser válido (CPF)'),
  registrationNumber: z.string().min(3, 'O registro (CRM/COREN) é obrigatório'),
  professionalType: z.enum(['PEDIATRICIAN', 'OBSTETRICIAN_GYNECOLOGIST', 'GENERAL_PRACTITIONER', 'NURSE', 'NURSING_TECHNICIAN']),
  clientId: z.string().min(1, 'O cliente é obrigatório'),
  active: z.boolean(),
});

type ProfessionalFormValues = z.infer<typeof professionalSchema>;

export default function NewProfessionalForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createProfessionalAction, null);

  const clientOptions = clients.map(c => ({ label: c.tradeName, value: String(c.id) }));

  const { register, handleSubmit, formState: { errors } } = useForm<ProfessionalFormValues>({
    resolver: zodResolver(professionalSchema),
    defaultValues: { active: true },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push('/professionals');
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  const onSubmit = (data: ProfessionalFormValues) => {
    startTransition(() => {
      formAction({ ...data, clientId: Number(data.clientId) } as unknown as Professional);
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/professionals">
          <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novo Profissional</h1>
          <p className="text-sm text-slate-500">Cadastre um novo membro do corpo técnico.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title="Dados Pessoais e Vínculo" description="Informações de identificação e unidade de trabalho.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Nome Completo" 
              placeholder="ex: Dr. João Silva"
              className="md:col-span-2"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            <FormInput 
              label="CPF" 
              placeholder="000.000.000-00"
              error={errors.document?.message}
              {...register('document')}
            />
            <FormInput 
              label="Registro (CRM/COREN)" 
              placeholder="ex: CRM-SP 12345"
              error={errors.registrationNumber?.message}
              {...register('registrationNumber')}
            />
            <FormSelect 
              label="Tipo de Profissional"
              options={[
                { label: 'Pediatra', value: 'PEDIATRICIAN' },
                { label: 'Ginecologista/Obstetra', value: 'OBSTETRICIAN_GYNECOLOGIST' },
                { label: 'Clínico Geral', value: 'GENERAL_PRACTITIONER' },
                { label: 'Enfermeiro', value: 'NURSE' },
                { label: 'Técnico de Enfermagem', value: 'NURSING_TECHNICIAN' },
              ]}
              error={errors.professionalType?.message}
              {...register('professionalType')}
            />
            <FormSelect 
              label="Cliente (Unidade)"
              options={clientOptions}
              error={errors.clientId?.message}
              {...register('clientId')}
            />
          </div>
        </FormSection>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <Link href="/professionals">
            <Button variant="ghost" type="button">Cancelar</Button>
          </Link>
          <Button type="submit" isLoading={isPending} className="px-8">
            Criar Profissional
          </Button>
        </div>
      </form>
    </div>
  );
}
