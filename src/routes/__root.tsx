import { Toaster } from "@/components/ui/sonner";
import { Outlet, redirect } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PageLoader } from "@/components/page-loader";
import type { useTRPC } from "@/integrations/trpc";
import type { useQueryClient } from "@tanstack/react-query";
import { checkApi } from "@/lib/check-api";

type Context = {
	trpc: ReturnType<typeof useTRPC>;
	queryClient: ReturnType<typeof useQueryClient>;
};

export const Route = createRootRouteWithContext<Context>()({
	component: RootComponent,
	beforeLoad: async () => {
		try {
			await checkApi();
		} catch (error) {
			redirect({
				to: "/error",
			});
		}
	},
	pendingComponent: () => <PageLoader />,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
			<Toaster />
		</>
	);
}
