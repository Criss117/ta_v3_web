import "./index.css";
import { StrictMode, Suspense, use } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Integrations } from "./integrations";
import { useTRPC } from "./integrations/trpc";
import { checkApi } from "./lib/check-api";
import { PageLoader } from "./components/page-loader";
import { useHealth } from "./hooks/use.healt";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient: {} as ReturnType<typeof useQueryClient>,
		trpc: {} as ReturnType<typeof useTRPC>,
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById("root");

if (!root) {
	throw new Error("No root element");
}

function App() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { isError, isPending } = useHealth();

	if (isPending) {
		return <PageLoader />;
	}

	if (!isPending && isError) {
		return (
			<div className="w-full h-dvh flex items-center justify-center">
				<div className="flex flex-col items-center justify-center space-y-5">
					<h1 className="text-primary text-5xl font-bold">Nimbly</h1>
					<p>El servidor no está disponible</p>
				</div>
			</div>
		);
	}

	return (
		<RouterProvider
			router={router}
			context={{
				queryClient,
				trpc,
			}}
		/>
	);
}

createRoot(root).render(
	<StrictMode>
		<Integrations>
			<Suspense fallback={<PageLoader />}>
				<App />
			</Suspense>
		</Integrations>
	</StrictMode>,
);
