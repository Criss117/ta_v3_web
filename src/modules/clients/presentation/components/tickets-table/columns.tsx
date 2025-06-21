import { format } from "@formkit/tempo";
import type { ColumnDef } from "@tanstack/react-table";

import { formatCurrency } from "@/lib/utils";
import type { Ticket } from "@/modules/clients/application/models";
import type { TicketStatus } from "@/modules/sales/application/models/schemas";
import { StatusBadge } from "@/components/status-badge";
import { TicketDropDown } from "./drop-down";

export const columns: ColumnDef<Ticket>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "createdAt",
		header: "Fecha",
		cell: ({ getValue }) => {
			const date = getValue() as Date;

			return format({
				date,
				format: "long",
				locale: "es-ES",
			});
		},
	},
	{
		accessorKey: "status",
		header: "Estado",
		cell: ({ getValue }) => {
			const status = getValue() as TicketStatus;

			return <StatusBadge value={status} />;
		},
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: ({ getValue }) => {
			return formatCurrency(getValue() as number);
		},
	},
	{
		accessorKey: "totalPaid",
		header: "Total pagado",
		cell: ({ getValue }) => {
			return formatCurrency(getValue() as number);
		},
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => <TicketDropDown ticket={row.original} />,
	},
];
