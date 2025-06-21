import { CheckCircle } from "lucide-react";
import { Suspense, useState } from "react";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useClientsTable } from "@/modules/clients/application/hooks/use.clients-table";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSaveTicketForm } from "@/modules/sales/application/store/save-ticket-form.store";
import type { ControllerRenderProps } from "react-hook-form";
import type { CreateTicketSchema } from "@/modules/sales/application/models/create-tickets.schema";
import type { SimpleClient } from "@/modules/clients/application/models";

export function CreditTabsContent() {
	const [searchQuery, setSearchQuery] = useState("");
	const { form } = useSaveTicketForm();

	return (
		<FormField
			control={form.control}
			name="clientId"
			render={({ field }) => (
				<FormItem>
					<FormMessage />
					<Command>
						<CommandInput
							placeholder="Buscar cliente"
							onValueChange={setSearchQuery}
						/>
						<Suspense fallback={<CommandEmpty>Loading...</CommandEmpty>}>
							<UsersList query={searchQuery} field={field} />
						</Suspense>
					</Command>
				</FormItem>
			)}
		/>
	);
}

function UsersList({
	query,
	field,
}: {
	query: string;
	field: ControllerRenderProps<CreateTicketSchema, "clientId">;
}) {
	const { form } = useSaveTicketForm();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useClientsTable({
			searchQuery: query,
		});

	const clients = data.pages.flatMap((p) => p.items);

	const handleSelect = (client: SimpleClient) => {
		form.setValue("clientId", client.id);
	};

	return (
		<>
			<CommandList>
				<CommandEmpty>No se encotro el cliente</CommandEmpty>
				{clients.map((c) => (
					<CommandItem
						key={c.id}
						className="flex items-center justify-between"
						onSelect={() => handleSelect(c)}
					>
						{c.fullName}
						{field.value === c.id && <CheckCircle />}
					</CommandItem>
				))}
				<InfiniteScroll
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
				/>
			</CommandList>
		</>
	);
}
