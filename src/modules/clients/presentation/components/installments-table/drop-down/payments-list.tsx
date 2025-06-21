import { format } from "@formkit/tempo";
import { ListCollapseIcon } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
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
import type { InstallmentPlanSummary } from "@/modules/clients/application/models/entities";

interface Props {
	installmentPayments: InstallmentPlanSummary["installments"];
}

interface CardProps {
	installment: InstallmentPlanSummary["installments"][number];
}

function PaymentCard({ installment }: CardProps) {
	return (
		<div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-3 shadow-sm justify-between">
			<header className="items-start space-y-1 justify-between flex">
				<div className="flex items-center space-x-2 ">
					<p>
						Número de couta: <span>{installment.installmentNumber}</span>
					</p>
					<StatusBadge value={installment.status} className="w-fit" />
				</div>

				<div className="flex items-end flex-col">
					<p className="text-sm font-normal">Fecha límite de pago</p>
					<p className="text-muted-foreground text-sm">
						{format({
							date: installment.dueDate,
							format: "long",
							locale: "es-ES",
						})}
					</p>
				</div>
			</header>
			<div className="flex justify-between">
				<div>
					<p className="text-sm">Total</p>
					<p className="text-muted-foreground">
						{formatCurrency(installment.subtotal)}
					</p>
				</div>
				<div className="flex items-end flex-col">
					<p className="text-sm">Total Pagado</p>
					<p className="text-muted-foreground">
						{formatCurrency(installment.subtotalPaid)}
					</p>
				</div>
			</div>
		</div>
	);
}

export function PaymentsList({ installmentPayments }: Props) {
	return (
		<Dialog>
			<DialogTrigger className="flex items-center gap-x-1.5">
				<ListCollapseIcon />
				Ver detalles
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lista de coutas</DialogTitle>
					<DialogDescription>
						Aquí verás todas las cuotas de pago
					</DialogDescription>
					<ScrollArea className="max-h-96">
						<div className="space-y-2">
							{installmentPayments.map((installment) => (
								<PaymentCard installment={installment} key={installment.id} />
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
