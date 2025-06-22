import { Suspense, useMemo, useState } from "react";
import { HandCoins } from "lucide-react";
import {
	getCoreRowModel,
	useReactTable,
	type RowSelectionState,
} from "@tanstack/react-table";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTRPC } from "@/integrations/trpc";
import { columns } from "./columns";
import { Table } from "@/components/ui/table";
import { DataTableHeader } from "@/components/data-table/header";
import { DataTableBody } from "@/components/data-table/body";
import { DialogClose } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { DeletePayments } from "./delete-payments";

interface Props {
	clientId: string;
}

function PaysListContent({ clientId }: Props) {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.clients.findManyPayments.infiniteQueryOptions(
			{
				limit: 10,
				clientId,
				cursor: {
					lastId: null,
					createdAt: null,
				},
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage.nextCursor.lastId ? lastPage.nextCursor : null,
			},
		),
	);

	const tableData = useMemo(
		() => query.data.pages.flatMap((page) => page.items),
		[query.data.pages],
	);

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),

		onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
		state: {
			rowSelection, //pass the row selection state back to the table instance
		},
	});

	return (
		<>
			<ScrollArea className="h-96">
				<Table className="">
					<DataTableHeader
						table={table}
						className="sticky top-0 bg-background "
					/>
					<DataTableBody
						table={table}
						columnLength={columns.length}
						isFetching={false}
						pageSize={100}
					/>
				</Table>
				<div className="">
					<InfiniteScroll
						fetchNextPage={query.fetchNextPage}
						hasNextPage={query.hasNextPage}
						isFetchingNextPage={query.isFetchingNextPage}
						isManual
					/>
				</div>
			</ScrollArea>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline" className="flex-1">
						Cerrar
					</Button>
				</DialogClose>
				<DeletePayments
					clientId={clientId}
					ids={table.getSelectedRowModel().rows.map((row) => row.original.id)}
				/>
			</DialogFooter>
		</>
	);
}

export function PaysList({ clientId }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex-1">
					<HandCoins />
					Lista de pagos
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lista de pagos</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<Suspense>
					<PaysListContent clientId={clientId} />
				</Suspense>
			</DialogContent>
		</Dialog>
	);
}
