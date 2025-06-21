import { useMemo } from "react";
import { useTRPC } from "@/integrations/trpc";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { columns } from "@/modules/clients/presentation/components/clients-table/columns";
import { useTable } from "@/modules/shared/hooks/use.table";

interface Props {
	searchQuery: string;
}

export function useClientsTable({ searchQuery }: Props) {
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.clients.findMany.infiniteQueryOptions(
			{
				search: {
					limit: 20,
					searchQuery,
				},
				cursor: {
					lastClientCode: null,
					createdAt: null,
				},
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage.nextCursor.lastClientCode ? lastPage.nextCursor : null,
			},
		),
	);

	const items = useMemo(
		() => query.data?.pages.flatMap((page) => page.items) ?? [],
		[query.data],
	);

	const table = useTable({
		columns,
		items,
		hasNextPage: query.hasNextPage,
		isFetching: query.isFetching,
		pageSize: 20,
		fetchNextPage: query.fetchNextPage,
	});

	return {
		...query,
		...table,
	};
}
