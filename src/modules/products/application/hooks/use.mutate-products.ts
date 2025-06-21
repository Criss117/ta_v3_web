import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";

export function useMutateProducts() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const create = useMutation(
		trpc.products.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
				toast.success("Producto creado");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const update = useMutation(
		trpc.products.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
				toast.success("Producto actualizado");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	const deleteProduct = useMutation(
		trpc.products.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.products.findMany.infiniteQueryFilter(),
				);
				toast.success("Producto eliminado");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	return {
		create,
		update,
		deleteProduct,
	};
}
