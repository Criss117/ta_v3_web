import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/dashboard/header";
import { ProductsListSection } from "@/modules/products/presentation/sections/products-list.section";

export const Route = createFileRoute("/(private)/dashboard/products")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SiteHeader label="Productos" />
			<div className="m-10">
				<ProductsListSection />
			</div>
		</>
	);
}
