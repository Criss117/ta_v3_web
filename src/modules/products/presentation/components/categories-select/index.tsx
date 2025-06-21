import { ChevronsUpDown } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCategories } from "@/modules/products/application/hooks/use.categories";
import { CreateCategory } from "@/modules/products/presentation/components/create-category";
import { CategoriesList } from "./categories-list";
import { UpdateCategory } from "../update-category";

interface Props<T extends FieldValues> extends React.ComponentProps<"select"> {
	label: string;
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
	setValue: (value: number) => void;
}

export function CategoriesSelect<T extends FieldValues>({
	control,
	name,
	label,
	description,
	setValue,
}: Props<T>) {
	const { items } = useCategories();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const selectedCategory = items.find((item) => item.id === field.value);

				return (
					<FormItem>
						<FormLabel className="w-fit">{label}</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant="outline"
										role="combobox"
										className={cn(
											"justify-between w-xl",
											!field.value && "text-muted-foreground",
										)}
									>
										{field.value
											? selectedCategory?.name
											: "Seleccione una categoría"}
										<ChevronsUpDown className="opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="w-xl p-0">
								<CategoriesList setValue={setValue} value={field.value} />

								<div className="flex gap-x-2 p-2">
									<CreateCategory />
									{selectedCategory ? (
										<UpdateCategory category={selectedCategory} />
									) : (
										<Button variant="outline" className="flex-1" disabled>
											Editar categoría
										</Button>
									)}
								</div>
							</PopoverContent>
						</Popover>
						{description && <FormDescription>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
