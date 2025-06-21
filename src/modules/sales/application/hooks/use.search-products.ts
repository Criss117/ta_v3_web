import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";
import { useTicketsStore } from "../store/tickets.store";
import { TRPCClientError } from "@trpc/client";
import type { TRPCError } from "@trpc/server";
import { toast } from "sonner";

export function useSearchProducts() {
	const [isPending, startTransition] = useTransition();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const addProduct = useTicketsStore((s) => s.addProduct);

	const search = async (
		barcode: string,
		{ onSuccess }: { onSuccess?: () => void },
	) => {
		startTransition(async () => {
			try {
				const res = await queryClient.fetchQuery(
					trpc.products.findOneBy.queryOptions({ barcode }),
				);

				addProduct({
					barcode: res.barcode,
					id: res.id,
					description: res.description,
					salePrice: res.salePrice,
					wholesalePrice: res.wholesalePrice,
					stock: res.stock,
					currentPrice: res.salePrice,
					currentStock: 1,
				});

				onSuccess?.();
			} catch (err) {
				if (!(err instanceof TRPCClientError)) {
					toast.error("Error al buscar producto");
					return;
				}

				const data = err.data as TRPCError;

				if (data.code === "NOT_FOUND") {
					toast.error("Producto no encontrado");
					return;
				}

				toast.error("Error al buscar producto");
			}
		});
	};

	return {
		search,
		isPending,
	};
}
