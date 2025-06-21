import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutateTickets } from "@/modules/clients/application/hooks/use.mutate-tickets";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
	clientId: string;
	ticketId: number;
}

export function DeleteTicket({ clientId, ticketId }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const { deleteTicket } = useMutateTickets();

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					Eliminar
					<Trash2Icon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Está seguro de eliminar el ticket?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta accion se eliminará de forma permanente y podrá recuperarse en
						cualquier momento.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<Button
						onClick={() =>
							deleteTicket.mutate(
								{
									clientId,
									ticketId,
								},
								{
									onSuccess: () => setIsOpen(false),
								},
							)
						}
						disabled={deleteTicket.isPending}
					>
						Continuar
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function CanontDeleteTicket() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" className="opacity-50 cursor-default">
					Eliminar
					<Trash2Icon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>No puede eliminar el ticket</DialogTitle>
					<DialogDescription>
						Este ticket tiene un pago asignado y no puede ser eliminado.
						<br />
						Eliminar el ticket puede causar pérdidas de datos.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cerrar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
