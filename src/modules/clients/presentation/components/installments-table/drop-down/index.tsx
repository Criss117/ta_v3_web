import { MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { InstallmentPlanSummary } from "@/modules/clients/application/models/entities";
import { PaymentsList } from "./payments-list";

interface Props {
	installmentPayments: InstallmentPlanSummary["installments"];
}

export function InstallmentPaymentsDropDown({ installmentPayments }: Props) {
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
						<PaymentsList installmentPayments={installmentPayments} />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
