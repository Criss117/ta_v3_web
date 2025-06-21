import { MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Ticket } from "@/modules/clients/application/models";
import {
	CanontDeleteTicket,
	DeleteTicket,
} from "@/modules/clients/presentation/components/delete-ticket";

interface Props {
	ticket: Ticket;
}

export function TicketDropDown({ ticket }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<MoreVerticalIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={(e) => e.preventDefault()}>
						{/* <PaymentsList installmentPayments={installmentPayments} /> */}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={(e) => e.preventDefault()}>
						{ticket.status !== "unpaid" || !ticket.clientId ? (
							<CanontDeleteTicket />
						) : (
							<DeleteTicket clientId={ticket.clientId} ticketId={ticket.id} />
						)}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
