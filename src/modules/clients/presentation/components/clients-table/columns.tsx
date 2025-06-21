import { User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { SimpleClient } from "@/modules/clients/application/models";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SimpleClient>[] = [
	{
		accessorKey: "clientCode",
		header: "Código",
	},
	{
		accessorKey: "fullName",
		header: "Nombre",
	},
	{
		accessorKey: "phone",
		header: "Teléfono",
		cell: ({ getValue }) => {
			const value = getValue() as string | null;
			return <span>{value || "-"}</span>;
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ getValue }) => {
			const value = getValue() as string | null;
			return <span>{value || "-"}</span>;
		},
	},
	{
		accessorKey: "address",
		header: "Dirección",
		cell: ({ getValue }) => {
			const value = getValue() as string | null;
			return <span>{value || "-"}</span>;
		},
	},
	{
		accessorKey: "creditLimit",
		header: "Límite de crédito",
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return <span>{formatCurrency(value)}</span>;
		},
	},
	{
		id: "actions",
		header: "Acciones",
		cell: ({ row }) => {
			const client = row.original as SimpleClient;

			return (
				<Button asChild variant="link">
					<Link
						to="/dashboard/clients/$id"
						params={{
							id: client.id,
						}}
					>
						<User2Icon />
						Ver detalles
					</Link>
				</Button>
			);
		},
	},
];
