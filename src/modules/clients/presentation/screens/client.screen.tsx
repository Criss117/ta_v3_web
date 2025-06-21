import { Link } from "@tanstack/react-router";
import { ArrowLeftCircle } from "lucide-react";
import { ClientHeaderSection } from "../sections/client-header.section";
import { Button } from "@/components/ui/button";
import { ClientHeaderSectionSkeleton } from "../sections/client-header.section/skeleton";
import { useTRPC } from "@/integrations/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientDataTableSection } from "../sections/client-data-table.section";

interface Props {
	clientId: string;
}

export function ClientScreen({ clientId }: Props) {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.clients.findOneBy.queryOptions({
			clientId,
		}),
	);

	return (
		<div className="m-10 space-y-5">
			<Button asChild variant="link" size="lg" className="px-0">
				<Link to="/dashboard/clients">
					<ArrowLeftCircle />
					Lista de clientes
				</Link>
			</Button>
			<ClientHeaderSection client={data} />
			<ClientDataTableSection clientId={clientId} />
		</div>
	);
}

export function ClientScreenSkeleton() {
	return (
		<div className="m-10 space-y-5">
			<Button variant="link" size="lg" className="px-0" disabled>
				<ArrowLeftCircle />
				Lista de clientes
			</Button>
			<ClientHeaderSectionSkeleton />
		</div>
	);
}
