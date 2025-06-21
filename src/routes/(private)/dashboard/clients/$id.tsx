import { TRPCClientError } from "@trpc/client";
import { SiteHeader, SiteHeaderSkeleton } from "@/components/dashboard/header";
import {
	ClientScreen,
	ClientScreenSkeleton,
} from "@/modules/clients/presentation/screens/client.screen";
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { TRPCError } from "@trpc/server";

export const Route = createFileRoute("/(private)/dashboard/clients/$id")({
	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		await context.queryClient
			.ensureQueryData(
				context.trpc.clients.findOneBy.queryOptions({
					clientId: params.id,
				}),
			)
			.catch((err) => {
				if (!(err instanceof TRPCClientError)) {
					throw redirect({
						to: "/dashboard",
					});
				}

				const data = err.data as TRPCError;

				if (data.code === "NOT_FOUND") {
					throw redirect({
						to: "/dashboard/clients",
					});
				}

				throw redirect({
					to: "/dashboard",
				});
			});
	},
	loader: async ({ params, context }) => {
		const { id } = params;

		return context.queryClient.fetchQuery(
			context.trpc.clients.findOneBy.queryOptions({
				clientId: id,
			}),
		);
	},
	pendingComponent: () => (
		<>
			<SiteHeaderSkeleton />
			<ClientScreenSkeleton />
		</>
	),
});

function RouteComponent() {
	const client = Route.useLoaderData();

	return (
		<>
			<SiteHeader label={client.fullName} />
			<ClientScreen clientId={client.id} />
		</>
	);
}
