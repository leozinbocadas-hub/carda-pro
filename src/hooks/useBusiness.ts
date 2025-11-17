import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useBusiness = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user,
  });

  const createBusiness = useMutation({
    mutationFn: async (businessData: any) => {
      const { data, error } = await supabase
        .from('businesses')
        .insert([{ ...businessData, owner_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      toast.success('Negócio criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar negócio');
    },
  });

  const updateBusiness = useMutation({
    mutationFn: async ({ id, ...businessData }: any) => {
      const { data, error } = await supabase
        .from('businesses')
        .update(businessData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      toast.success('Negócio atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar negócio');
    },
  });

  return {
    business,
    isLoading,
    createBusiness,
    updateBusiness,
  };
};
