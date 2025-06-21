import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PageLoader } from "@/components/page-loader";
import type { useTRPC } from "@/integrations/trpc";
import type { useQueryClient } from "@tanstack/react-query";
import type { User } from "better-auth/types";

type Context = {
	getUser: () => User | null;
	trpc: ReturnType<typeof useTRPC>;
	queryClient: ReturnType<typeof useQueryClient>;
};

export const Route = createRootRouteWithContext<Context>()({
	component: RootComponent,
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
