import { flexRender, type Table } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

interface Props<T> {
	table: Table<T>;
	className?: string;
}

export function DataTableHeader<T>({ table, className }: Props<T>) {
	return (
		<TableHeader className={cn(className)}>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						return (
							<TableHead key={header.id} className="text-center text-base">
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</TableHead>
						);
					})}
				</TableRow>
			))}
		</TableHeader>
	);
}
