import { DataTableHeader } from "@/components/data-table/header";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { TableBodySkeleton } from "@/components/data-table/skeleton";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface Props {
	pageSize: number;
}

export function PaysListSkeleton({ pageSize }: Props) {
	const table = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<ScrollArea className="h-96">
				<Table className="">
					<DataTableHeader
						table={table}
						className="sticky top-0 bg-background "
					/>
					<TableBody>
						<TableBodySkeleton pageSize={pageSize} length={columns.length} />
					</TableBody>
				</Table>
			</ScrollArea>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline" className="flex-1">
						Cerrar
					</Button>
				</DialogClose>
				<Button variant="destructive" className="flex-1" disabled>
					Eliminar (0) seleccionados
				</Button>
			</DialogFooter>
		</>
	);
}
