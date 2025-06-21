import { SiteHeader } from "@/components/dashboard/header";
import { HomeScreen } from "@/modules/analitics/presentation/screens/home.screen";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SiteHeader label="Home" />
			<HomeScreen />
		</>
	);
}
