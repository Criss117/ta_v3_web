import { toast } from "sonner";
import { useTRPC } from "@/integrations/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateCategories() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const create = useMutation(
		trpc.categories.create.mutationOptions({
			onSuccess: () => {
				toast.success("Categoría creada");
				queryClient.invalidateQueries(
					trpc.categories.findMany.infiniteQueryFilter(),
				);
			},
			onError: (error) => {
				console.log(error);
			},
		}),
	);

	return {
		create,
	};
}
