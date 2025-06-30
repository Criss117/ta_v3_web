import { Suspense } from "react";
import { TicketsTable } from "../components/tickets-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TicketsTableSkeleton } from "../components/tickets-table/skeleton";

interface Props {
	clientId: string;
}

export default function TicketsListSection({ clientId }: Props) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Tickets del Cliente</CardTitle>
						<CardDescription>
							Historial completo de tickets y pagos
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<TicketsTableSkeleton pageSize={10} />}>
					<TicketsTable clientId={clientId} />
				</Suspense>
			</CardContent>
		</Card>
	);
}
