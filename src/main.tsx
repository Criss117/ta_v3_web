import "./index.css";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Integrations } from "./integrations";
import { useAuth } from "./modules/auth/application/store/auth.store";
import { authClient } from "./integrations/auth";
import { useTRPC } from "./integrations/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { PageLoader } from "./components/page-loader";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		getUser: () => null,
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
	const { data, isPending } = authClient.useSession();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const getUser = useAuth((s) => s.getUser);
	const setUser = useAuth((s) => s.setUser);

	useEffect(() => {
		if (!isPending && data?.user) {
			setUser(data.user);
		}
	}, [isPending, data?.user, setUser]);

	if (isPending) {
		return <PageLoader />;
	}

	return (
		<RouterProvider
			router={router}
			context={{
				getUser,
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
