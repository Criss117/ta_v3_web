import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTableNav } from "@/components/data-table/nav";
import { DataTableHeader } from "@/components/data-table/header";
import { DataTableBody } from "@/components/data-table/body";
import { useClientsTable } from "@/modules/clients/application/hooks/use.clients-table";

interface Props {
	searchQuery: string;
}

export function ClientsTable({ searchQuery }: Props) {
	const {
		hasNextPage,
		table,
		pagination,
		isFetching,
		handleFetchNextPage,
		previousPage,
		refetch,
	} = useClientsTable({ searchQuery });

	return (
		<>
			<div className="flex items-center justify-end gap-x-5">
				<DataTableNav
					disabledPrev={!table.getCanPreviousPage()}
					disabledNext={!hasNextPage && !table.getCanNextPage()}
					nextPage={handleFetchNextPage}
					previousPage={previousPage}
					isPending={isFetching}
				/>
				<Button
					variant="outline"
					size="icon"
					disabled={isFetching}
					onClick={() => refetch()}
				>
					<RotateCw className={cn(isFetching && "animate-spin")} />
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<DataTableHeader table={table} />
					<DataTableBody
						table={table}
						columnLength={columns.length}
						isFetching={isFetching}
						pageSize={pagination.pageSize}
					/>
				</Table>
			</div>
			<DataTableNav
				disabledPrev={!table.getCanPreviousPage()}
				disabledNext={!hasNextPage && !table.getCanNextPage()}
				nextPage={handleFetchNextPage}
				previousPage={previousPage}
				isPending={isFetching}
			/>
		</>
	);
}
