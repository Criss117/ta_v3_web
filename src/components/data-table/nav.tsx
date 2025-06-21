import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

interface Props {
	disabledPrev: boolean;
	disabledNext: boolean;
	isPending: boolean;
	nextPage: () => void;
	previousPage: () => void;
}

export function DataTableNav({
	disabledNext,
	disabledPrev,
	isPending,
	nextPage,
	previousPage,
}: Props) {
	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<Button
				variant="outline"
				onClick={previousPage}
				disabled={disabledPrev || isPending}
			>
				Anterior
			</Button>
			<Button
				variant="outline"
				onClick={nextPage}
				disabled={disabledNext || isPending}
			>
				Siguiente
			</Button>
		</div>
	);
}

export function TableNavSkeleton() {
	return (
		<div className="flex items-center justify-end gap-x-5">
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button variant="outline" disabled>
					Anterior
				</Button>
				<Button variant="outline" disabled>
					Siguiente
				</Button>
			</div>
			<Button variant="outline" size="icon" disabled>
				<RotateCw className="animate-spin" />
			</Button>
		</div>
	);
}
