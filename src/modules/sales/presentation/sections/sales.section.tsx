import { Button } from "@/components/ui/button";
import { SearchProducts } from "../components/search-products";
import { ProductsList } from "../components/products-list";
import { useTicketsStore } from "@/modules/sales/application/store/tickets.store";

export function SalesSection() {
	const selectedProductIds = useTicketsStore(
		(state) => state.selectedProductIds,
	);
	const toWholesale = useTicketsStore((state) => state.toWholesale);

	const hasIds = selectedProductIds.length > 0;

	return (
		<>
			<SearchProducts />
			<div className="my-5 space-x-2 w-2/5 flex">
				<Button className="w-1/3" variant="outline">
					Art. Común
				</Button>
				<ProductsList />
				<Button
					className="w-1/3"
					variant="outline"
					disabled={!hasIds}
					onClick={toWholesale}
				>
					Mayoreo
				</Button>
			</div>
		</>
	);
}
