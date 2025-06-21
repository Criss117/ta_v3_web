import { SiteHeader } from "@/components/dashboard/header";
import { ClientsScreen } from "@/modules/clients/presentation/screens/clients.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/dashboard/clients/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SiteHeader label="Clientes" />
			<ClientsScreen />
		</>
	);
}
