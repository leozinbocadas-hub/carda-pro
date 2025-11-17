import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useDrivers = (businessId?: string) => {
  const queryClient = useQueryClient();

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ['drivers', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('delivery_drivers')
        .select('*, profiles(*)')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!businessId,
  });

  const updateDriverAvailability = useMutation({
    mutationFn: async ({ id, is_available }: { id: string; is_available: boolean }) => {
      const { data, error } = await supabase
        .from('delivery_drivers')
        .update({ is_available })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast.success('Disponibilidade atualizada!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar disponibilidade');
    },
  });

  const updateDriverLocation = useMutation({
    mutationFn: async ({ id, location }: { id: string; location: any }) => {
      const { data, error } = await supabase
        .from('delivery_drivers')
        .update({ current_location: location })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar localização:', error);
    },
  });

  return {
    drivers,
    isLoading,
    updateDriverAvailability,
    updateDriverLocation,
  };
};
