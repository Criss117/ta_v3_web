import { createFileRoute, redirect } from "@tanstack/react-router";
import { SalesFooterSection } from "@/modules/sales/presentation/sections/sales-footer.section";
import { SalesHeaderSection } from "@/modules/sales/presentation/sections/sales-header.section";
import { SalesSection } from "@/modules/sales/presentation/sections/sales.section";
import { TicketsListSection } from "@/modules/sales/presentation/sections/tickets-list.section";
import { PageLoader } from "@/components/page-loader";

export const Route = createFileRoute("/(private)/sales/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		const { getUser } = context;

		const user = getUser();

		if (!user) {
			throw redirect({
				to: "/auth/sign-in",
			});
		}

		return { user };
	},
	pendingComponent: () => <PageLoader />,
});

function RouteComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<SalesHeaderSection />
			<section className="mt-20 mb-32 mx-20">
				<SalesSection />
				<TicketsListSection />
			</section>
			<SalesFooterSection />
		</div>
	);
}
