import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useOrders = (businessId?: string) => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          delivery_drivers(*)
        `)
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!businessId,
  });

  const createOrder = useMutation({
    mutationFn: async ({ orderData, items }: any) => {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item: any) => ({
        ...item,
        order_id: order.id,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar pedido');
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'pendente' | 'confirmado' | 'em_preparo' | 'pronto' | 'em_entrega' | 'entregue' | 'cancelado' }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Status atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar status');
    },
  });

  const assignDriver = useMutation({
    mutationFn: async ({ orderId, driverId }: { orderId: string; driverId: string }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ driver_id: driverId })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Entregador atribuído com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atribuir entregador');
    },
  });

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    assignDriver,
  };
};
