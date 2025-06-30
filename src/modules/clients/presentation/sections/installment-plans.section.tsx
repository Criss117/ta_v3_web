import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { InstallmentTable } from "../components/installments-table";
import { InstallmentsTableSkeleton } from "../components/installments-table/skeleton";

interface Props {
	clientId: string;
}

export function InstallmentsPlansSection({ clientId }: Props) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Planes de Pago</CardTitle>
						<CardDescription>
							Historial completo de planes de pago
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<InstallmentsTableSkeleton pageSize={10} />}>
					<InstallmentTable clientId={clientId} />
				</Suspense>
			</CardContent>
		</Card>
	);
}
