import { ListCollapseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import type { Ticket } from "@/modules/clients/application/models";

interface Props {
	ticket: Ticket;
}

interface CardProps {
	item: Ticket["items"][number];
}

function TicketItemCard({ item }: CardProps) {
	return (
		<div className="bg-card text-card-foreground flex gap-6 rounded-xl border p-3 shadow-sm justify-between">
			<p>{item.quantity}</p>
			<p>{item.description}</p>
			<p>{formatCurrency(item.subtotal)}</p>
		</div>
	);
}

export function TicketItemsList({ ticket }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full" variant="outline" size="sm">
					<ListCollapseIcon />
					Ver detalles
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lista de coutas</DialogTitle>
					<DialogDescription>
						Aquí verás todas las cuotas de pago
					</DialogDescription>
					<ScrollArea className="max-h-96">
						<div className="space-y-2">
							{ticket.items.map((item) => (
								<TicketItemCard item={item} key={item.id} />
							))}
						</div>
					</ScrollArea>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cerrar</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
