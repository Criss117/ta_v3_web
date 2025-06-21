import { createFileRoute } from "@tanstack/react-router";
import { ProductsScreen } from "@/modules/products/presentation/screens/products.screen";
import { SiteHeader } from "@/components/dashboard/header";

export const Route = createFileRoute("/(private)/dashboard/products")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SiteHeader label="Productos" />
			<ProductsScreen />
		</>
	);
}
