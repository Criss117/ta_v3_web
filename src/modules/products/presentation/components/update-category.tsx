import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { Category } from "@/modules/products/application/models";
import { CategoryForm } from "./category-form";

interface Props {
	category: Category;
}

export function UpdateCategory({ category }: Props) {
	const [open, setOpen] = useState(false);
	// const { create } = useMutateCategories();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button className="flex-1" variant="outline" disabled={!category}>
					Editar categoría
					<span className="text-xs text-muted-foreground">
						{category?.name}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<CategoryForm
					category={category}
					onSubmit={(data) => console.log(data)}
					isPending={false}
					closeDialog={() => setOpen(false)}
				/>
			</PopoverContent>
		</Popover>
	);
}
