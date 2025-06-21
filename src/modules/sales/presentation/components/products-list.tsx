import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useProductsTable } from "@/modules/products/application/hooks/use.products-table";
import { InfiniteScroll } from "@/components/infinite-scroll";
import type { Product } from "@/modules/products/application/models";
import { useTicketsStore } from "@/modules/sales/application/store/tickets.store";
import { SearchInput } from "@/components/search-input";

interface Props {
	onSelectProduct: () => void;
	searchQuery: string;
}

function ProductsListSuspence({ searchQuery, onSelectProduct }: Props) {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useProductsTable({ searchQuery });
	const addProduct = useTicketsStore((s) => s.addProduct);

	const products = data.pages.flatMap((p) => p.items);

	const handleSelectProduct = (product: Product) => {
		addProduct({
			barcode: product.barcode,
			id: product.id,
			description: product.description,
			salePrice: product.salePrice,
			wholesalePrice: product.wholesalePrice,
			stock: product.stock,
			currentPrice: product.salePrice,
			currentStock: 1,
		});
		onSelectProduct();
	};

	return (
		<CommandList>
			<CommandEmpty>No se encotro el cliente</CommandEmpty>
			{products.map((i) => (
				<CommandItem
					key={i.id}
					className="flex items-center justify-between"
					onSelect={() => handleSelectProduct(i)}
				>
					{i.description}
				</CommandItem>
			))}
			<InfiniteScroll
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</CommandList>
	);
}

export function ProductsList() {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const onSelectProduct = () => {
		setOpen(false);
		setSearchQuery("");
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-1/3" variant="outline">
					Buscar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Buscar producto</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<Command className="space-y-5">
					<SearchInput
						placeholder="Buscar un producto"
						query={searchQuery}
						setQuery={setSearchQuery}
					/>
					<Suspense fallback={<div>Loading...</div>}>
						<ProductsListSuspence
							searchQuery={searchQuery}
							onSelectProduct={onSelectProduct}
						/>
					</Suspense>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
