import { TableBodySkeleton } from "@/modules/products/presentation/components/products-table/skeleton";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { flexRender, type Table } from "@tanstack/react-table";

interface Props<T> {
	table: Table<T>;
	columnLength: number;
	isFetching: boolean;
	pageSize: number;
}

export function DataTableBody<T>({
	table,
	columnLength,
	isFetching,
	pageSize,
}: Props<T>) {
	return (
		<TableBody>
			{isFetching && <TableBodySkeleton pageSize={pageSize} />}
			{!isFetching &&
				table.getRowModel().rows?.length > 0 &&
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id} className="h-12 text-center">
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
			{!isFetching && !table.getRowModel().rows?.length && (
				<TableRow>
					<TableCell colSpan={columnLength} className="h-24 text-center">
						Sin resultados.
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
}
