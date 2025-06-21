import { DataTableBody } from "@/components/data-table/body";
import { DataTableHeader } from "@/components/data-table/header";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { columns } from "./columns";
import { useInstallmentTable } from "@/modules/clients/application/hooks/use.installment-table";

interface Props {
	clientId: string;
}

export function InstallmentTable({ clientId }: Props) {
	const { table, refetch, isPending } = useInstallmentTable({ clientId });

	return (
		<>
			<div className="flex items-center justify-end gap-x-5">
				<Button
					variant="outline"
					size="icon"
					disabled={isPending}
					onClick={() => refetch()}
				>
					<RotateCw className={cn(isPending && "animate-spin")} />
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<DataTableHeader table={table} />
					<DataTableBody
						table={table}
						columnLength={columns.length}
						isFetching={isPending}
						pageSize={20}
					/>
				</Table>
			</div>
		</>
	);
}
