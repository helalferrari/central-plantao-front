'use client'

import { useState, useEffect, useCallback } from 'react';
import { Contract } from '@/types/contract';
import { apiFetch } from '@/lib/api';

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiFetch<Contract[]>('/contracts');
      setContracts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContracts();
  }, [fetchContracts]);

  return { contracts, isLoading, error, refresh: fetchContracts };
}
