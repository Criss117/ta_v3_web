import { toast } from "sonner";
import { useTRPC } from "@/integrations/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useRefreshClientData } from "./use.refresh-client-data";

export function useMutateClients() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const router = useRouter();
	const { refreshClientPageData } = useRefreshClientData();

	const create = useMutation(
		trpc.clients.createClient.mutationOptions({
			onMutate: () => {
				toast.loading("Creando cliente", {
					position: "top-center",
					id: "create-client",
				});
			},
			onSuccess: (data) => {
				toast.dismiss("create-client");
				toast.success("Cliente creado exitosamente", {
					position: "top-center",
				});
				queryClient.invalidateQueries(
					trpc.clients.findMany.infiniteQueryFilter(),
				);
				router.navigate({
					to: "/dashboard/clients/$id",
					params: { id: data.id },
				});
			},
			onError: () => {
				toast.dismiss("create-client");
				toast.error("Error al crear cliente", { position: "top-center" });
			},
		}),
	);

	const update = useMutation(
		trpc.clients.updateClient.mutationOptions({
			onMutate: () => {
				toast.loading("Actualizando cliente", {
					position: "top-center",
					id: "update-client",
				});
			},
			onSuccess: (_, variables) => {
				toast.dismiss("update-client");
				toast.success("Cliente actualizado exitosamente", {
					position: "top-center",
				});
				refreshClientPageData(variables.clientId, ["client"]);
			},
			onError: (err) => {
				toast.dismiss("update-client");
				toast.error(err.message, { position: "top-center" });
			},
		}),
	);

	return {
		create,
		update,
	};
}
