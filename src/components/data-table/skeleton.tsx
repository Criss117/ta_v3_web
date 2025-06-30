import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

interface Props {
	length: number;
	pageSize: number;
}

export function TableBodySkeleton({ pageSize, length }: Props) {
	return (
		<>
			{Array.from({ length: pageSize }).map((_, index) => (
				<TableRow key={index.toString()}>
					<TableCell colSpan={length} className="text-center h-12">
						<Skeleton className="w-full h-8 bg-slate-600" />
					</TableCell>
				</TableRow>
			))}
		</>
	);
}
