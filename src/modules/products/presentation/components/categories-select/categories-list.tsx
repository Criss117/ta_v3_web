import { useMemo } from "react";
import { Check } from "lucide-react";
import { SearchInput } from "@/components/search-input";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useCategories } from "@/modules/products/application/hooks/use.categories";

interface Props {
	setValue: (value: number) => void;
	value: number;
}

export function CategoriesList({ setValue, value }: Props) {
	const { items, setSearchQuery, searchQuery, isFetching } = useCategories();

	const data = useMemo(
		() => items.map((item) => ({ value: item.id, label: item.name })),
		[items],
	);

	return (
		<Command>
			<SearchInput
				placeholder="Buscar una categoría"
				query={searchQuery}
				setQuery={setSearchQuery}
			/>
			<CommandList>
				{isFetching && <CommandEmpty>Cargando...</CommandEmpty>}
				<CommandEmpty>No hay resultados</CommandEmpty>
				<CommandGroup>
					{data.map((item) => (
						<CommandItem
							value={item.label}
							key={item.value}
							onSelect={() => setValue(item.value)}
						>
							{item.label}
							<Check
								className={cn(
									"ml-auto",
									item.value === value ? "opacity-100" : "opacity-0",
								)}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
