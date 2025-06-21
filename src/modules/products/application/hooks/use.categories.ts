import { useTRPC } from "@/integrations/trpc";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export function useCategories() {
	const [searchQuery, setSearchQuery] = useState("");
	const trpc = useTRPC();
	const query = useInfiniteQuery(
		trpc.categories.findMany.infiniteQueryOptions(
			{
				search: {
					limit: 20,
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

	return {
		searchQuery,
		items,
		setSearchQuery,
		...query,
	};
}
