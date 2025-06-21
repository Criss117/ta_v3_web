import type { CompleteClient } from "@/modules/clients/application/models";
import { ClientFormDialog } from "./client-form/dialog";
import { useMutateClients } from "../../application/hooks/use.mutate-clients";

interface Props {
	client: CompleteClient;
}

export function UpdateClient({ client }: Props) {
	const { update } = useMutateClients();

	return (
		<ClientFormDialog
			client={client}
			isPending={update.isPending}
			onSubmit={(data) => {
				update.mutate({
					clientId: client.id,
					...data,
				});
			}}
			triggerVariant="icon"
		/>
	);
}
