import { useMemo, useState } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";
import { columns } from "@/modules/products/presentation/components/products-table/columns";
import { useTable } from "@/modules/shared/hooks/use.table";

interface Props {
	searchQuery: string;
}

export function useProductsTable({ searchQuery }: Props) {
	const [limit, setLimit] = useState(20);
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.products.findMany.infiniteQueryOptions(
			{
				search: {
					limit,
					searchQuery,
				},
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

	const items = useMemo(
		() => query.data?.pages.flatMap((page) => page.items) ?? [],
		[query.data],
	);

	const table = useTable({
		columns,
		items,
		hasNextPage: query.hasNextPage,
		isFetching: query.isFetching,
		fetchNextPage: query.fetchNextPage,
		pageSize: limit,
	});

	return {
		...query,
		...table,
	};
}
