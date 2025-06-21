import { Suspense } from "react";
import { TicketsTable } from "../components/tickets-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
				<Suspense fallback={<div>Loading...</div>}>
					<TicketsTable clientId={clientId} />
				</Suspense>
			</CardContent>
		</Card>
	);
}
