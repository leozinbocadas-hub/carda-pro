import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useCategories = (businessId?: string) => {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!businessId,
  });

  const createCategory = useMutation({
    mutationFn: async (categoryData: any) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria criada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar categoria');
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...categoryData }: any) => {
      const { data, error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria atualizada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar categoria');
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria excluída com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao excluir categoria');
    },
  });

  return {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
