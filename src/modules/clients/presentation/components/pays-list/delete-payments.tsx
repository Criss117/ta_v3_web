import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutatePayments } from "@/modules/clients/application/hooks/use.mutate-payments";

interface Props {
	clientId: string;
	ids: number[];
	variant?: "icon";
}

export function DeletePayments({ clientId, ids, variant }: Props) {
	const { deletePayments } = useMutatePayments();

	return (
		<Button
			size={variant === "icon" ? "icon" : "default"}
			variant="destructive"
			className={cn(variant !== "icon" && "flex-1")}
			disabled={ids.length === 0}
			onClick={() => {
				deletePayments.mutate({
					clientId,
					ids,
				});
			}}
		>
			{variant === "icon" ? (
				<Trash2Icon />
			) : (
				`Eliminar (${ids.length}) seleccionados `
			)}
		</Button>
	);
}
