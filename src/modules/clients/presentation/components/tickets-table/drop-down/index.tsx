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
import { TicketItemsList } from "./ticket-items-list";

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
			<DropdownMenuContent className="w-[150px]">
				<DropdownMenuGroup className="space-y-2">
					<DropdownMenuItem onClick={(e) => e.preventDefault()} asChild>
						<TicketItemsList ticket={ticket} />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={(e) => e.preventDefault()} asChild>
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
