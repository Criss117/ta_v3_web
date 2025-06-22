import { useMemo } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc";
import { columns } from "@/modules/products/presentation/components/products-table/columns";
import { useTable } from "@/modules/shared/hooks/use.table";

interface Props {
	searchQuery: string;
}

export function useProductsTable({ searchQuery }: Props) {
	console.log({ searchQuery });
	const trpc = useTRPC();
	const query = useSuspenseInfiniteQuery(
		trpc.products.findMany.infiniteQueryOptions(
			{
				limit: 20,
				searchQuery: searchQuery ?? null,

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
		pageSize: 20,
	});

	return {
		...query,
		...table,
	};
}
