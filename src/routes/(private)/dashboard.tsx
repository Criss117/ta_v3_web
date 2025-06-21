import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard";
import { PageLoader } from "@/components/page-loader";

export const Route = createFileRoute("/(private)/dashboard")({
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
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
