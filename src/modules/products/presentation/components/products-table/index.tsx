import { RotateCw } from "lucide-react";
import { Table } from "@/components/ui/table";
import { useProductsTable } from "@/modules/products/application/hooks/use.products-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataTableHeader } from "@/components/data-table/header";
import { DataTableNav } from "@/components/data-table/nav";
import { DataTableBody } from "@/components/data-table/body";
import { columns } from "./columns";

interface Props {
	searchQuery: string;
}

export function ProductsTable({ searchQuery }: Props) {
	const {
		hasNextPage,
		table,
		pagination,
		isFetching,
		handleFetchNextPage,
		previousPage,
		refetch,
	} = useProductsTable({ searchQuery });

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
