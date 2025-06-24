import "./index.css";
import { StrictMode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Integrations } from "./integrations";
import { useTRPC } from "./integrations/trpc";

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
			<App />
		</Integrations>
	</StrictMode>,
);
