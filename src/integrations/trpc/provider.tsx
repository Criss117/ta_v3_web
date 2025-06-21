import { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { getQueryClient } from "../tanstack-query";
import superjson from "superjson";
import { TRPCProvider as TProvider } from ".";
import type { AppRouter } from "./index.d.mts";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					transformer: superjson,
					url: "http://localhost:8787/api/trpc",
					fetch(url, options) {
						const rOptiosn = options as RequestInit;

						return fetch(url, {
							credentials: "include",
							...rOptiosn,
						});
					},
				}),
			],
		}),
	);
	return (
		<TProvider trpcClient={trpcClient} queryClient={queryClient}>
			{children}
		</TProvider>
	);
}
