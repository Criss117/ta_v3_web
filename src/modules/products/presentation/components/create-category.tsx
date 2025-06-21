import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMutateCategories } from "@/modules/products/application/hooks/use.mutate-categories";
import { CategoryForm } from "./category-form";

export function CreateCategory() {
	const [open, setOpen] = useState(false);
	const { create } = useMutateCategories();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button className="flex-1">Crear categoría</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<CategoryForm
					onSubmit={(data) =>
						create.mutate(
							{
								name: data.name,
								description: data.description,
							},
							{
								onSuccess: () => setOpen(false),
							},
						)
					}
					isPending={create.isPending}
					closeDialog={() => setOpen(false)}
				/>
			</PopoverContent>
		</Popover>
	);
}
