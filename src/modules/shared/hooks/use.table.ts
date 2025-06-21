import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface Props<T> {
	items: T[];
	hasNextPage: boolean;
	isFetching: boolean;
	columns: ColumnDef<T>[];
	pageSize?: number;
	fetchNextPage: () => void;
}

export function useTable<T>({
	items,
	hasNextPage,
	isFetching,
	columns,
	pageSize = 20,
	fetchNextPage,
}: Props<T>) {
	const [changePage, setShangePage] = useState(false);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize,
	});

	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination,
		},
	});

	const handleFetchNextPage = () => {
		if (!hasNextPage) {
			nextPage();
			return;
		}

		if (!table.getCanNextPage()) {
			fetchNextPage();
		}

		setShangePage(true);
	};

	const nextPage = () => {
		setPagination((prev) => ({
			...prev,
			pageIndex: table.getCanNextPage() ? prev.pageIndex + 1 : prev.pageIndex,
		}));
	};

	const previousPage = () => {
		setPagination((prev) => ({
			...prev,
			pageIndex: prev.pageIndex - 1 > 0 ? prev.pageIndex - 1 : 0,
		}));
	};

	useEffect(() => {
		if (isFetching || !changePage || !table.getCanNextPage()) return;

		nextPage();
		setShangePage(false);
	}, [changePage, isFetching, items.length]);

	return {
		table,
		pagination,
		previousPage,
		nextPage,
		handleFetchNextPage,
	};
}
