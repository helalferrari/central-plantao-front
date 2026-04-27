'use client'

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button, FormInput, FormSection } from '@/components/ui/form-components';
import { toast } from 'sonner';
import { useActionState, useEffect, startTransition } from 'react';
import { createClientAction } from '@/app/actions/client-actions';
import { Client } from '@/types/client';
import Link from 'next/link';

const clientSchema = z.object({
  corporateName: z.string().min(3, 'A razão social deve ter pelo menos 3 caracteres'),
  tradeName: z.string().min(3, 'O nome fantasia deve ter pelo menos 3 caracteres'),
  document: z.string().min(11, 'O documento deve ser válido (CPF/CNPJ)'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  active: z.boolean(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createClientAction, null);

  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: { active: true },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push('/clients');
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  const onSubmit = (data: ClientFormValues) => {
    startTransition(() => {
      formAction(data as unknown as Client);
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novo Cliente</h1>
          <p className="text-sm text-slate-500">Cadastre uma nova entidade contratante.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title="Dados Cadastrais" description="Informações jurídicas e de contato.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Razão Social" 
              placeholder="ex: Hospital Geral Ltda"
              className="md:col-span-2"
              error={errors.corporateName?.message}
              {...register('corporateName')}
            />
            <FormInput 
              label="Nome Fantasia" 
              placeholder="ex: Hospital Central"
              error={errors.tradeName?.message}
              {...register('tradeName')}
            />
            <FormInput 
              label="CNPJ/CPF" 
              placeholder="00.000.000/0000-00"
              error={errors.document?.message}
              {...register('document')}
            />
            <FormInput 
              label="E-mail" 
              type="email"
              placeholder="contato@hospital.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <FormInput 
              label="Telefone" 
              placeholder="(00) 00000-0000"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </FormSection>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <Link href="/clients">
            <Button variant="ghost" type="button">Cancelar</Button>
          </Link>
          <Button type="submit" isLoading={isPending} className="px-8">
            Criar Cliente
          </Button>
        </div>
      </form>
    </div>
  );
}
