import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableHeader } from "@/components/data-table/header";
import { TableNavSkeleton } from "@/components/data-table/nav";

export function TableBodySkeleton({ pageSize }: { pageSize: number }) {
	return (
		<>
			{Array.from({ length: pageSize }).map((_, index) => (
				<TableRow key={index.toString()}>
					<TableCell colSpan={columns.length} className="text-center h-12">
						<Skeleton className="w-full h-8 bg-slate-600" />
					</TableCell>
				</TableRow>
			))}
		</>
	);
}

export function ClientsTableSkeleton({ pageSize }: { pageSize: number }) {
	const table = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<TableNavSkeleton />
			<div className="rounded-md border">
				<Table>
					<DataTableHeader table={table} />
					<TableBody>
						<TableBodySkeleton pageSize={pageSize} />
					</TableBody>
				</Table>
			</div>
			<TableNavSkeleton />
		</>
	);
}
