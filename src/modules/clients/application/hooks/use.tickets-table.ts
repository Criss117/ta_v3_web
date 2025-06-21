import { useTRPC } from "@/integrations/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "@/modules/clients/presentation/components/tickets-table/columns";

interface Props {
	clientId: string;
}

export function useTicketsTable({ clientId }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseQuery(
		trpc.tickets.findManyByClient.queryOptions({
			clientId,
		}),
	);

	const table = useReactTable({
		columns,
		data: query.data,
		getCoreRowModel: getCoreRowModel(),
	});

	return {
		table,
		items: query.data,
		...query,
	};
}
