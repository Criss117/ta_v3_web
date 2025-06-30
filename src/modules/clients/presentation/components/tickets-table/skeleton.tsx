import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { Table, TableBody } from "@/components/ui/table";
import { DataTableHeader } from "@/components/data-table/header";
import { TableBodySkeleton } from "@/components/data-table/skeleton";

interface Props {
	pageSize: number;
}

export function TicketsTableSkeleton({ pageSize }: Props) {
	const table = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<DataTableHeader table={table} />
					<TableBody>
						<TableBodySkeleton pageSize={pageSize} length={columns.length} />
					</TableBody>
				</Table>
			</div>
		</>
	);
}
