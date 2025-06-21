import { Suspense, useState } from "react";
import { ProductsTable } from "../components/products-table";
import { ProductsTableSkeleton } from "../components/products-table/skeleton";
import { SearchInput } from "@/components/search-input";
import { CreateProduct } from "../components/create-product";

export function ProductsListSection() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<header className="flex justify-between gap-x-5">
				<div className="w-1/2">
					<SearchInput
						query={searchQuery}
						setQuery={setSearchQuery}
						placeholder="Busca por descripción o código de barras"
					/>
				</div>
				<div>
					<CreateProduct />
					<button type="button">TODO: categories list</button>
				</div>
			</header>
			<Suspense fallback={<ProductsTableSkeleton pageSize={10} />}>
				<ProductsTable searchQuery={searchQuery} />
			</Suspense>
		</>
	);
}
