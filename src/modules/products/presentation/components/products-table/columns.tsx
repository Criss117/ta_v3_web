import type { Product } from "@/modules/products/application/models";
import type { ColumnDef } from "@tanstack/react-table";
import { EditProduct } from "../update-product";
import { DeleteProduct } from "../delete.product";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "barcode",
		header: "Codigo de barras",
	},
	{
		accessorKey: "description",
		header: "Descripción",
	},
	{
		accessorKey: "category",
		header: "Categoría",
		cell: ({ getValue }) => {
			const value = getValue() as {
				id: number;
				name: string;
			} | null;
			return <span>{value?.name ?? "Sin categoría"}</span>;
		},
	},
	{
		accessorKey: "costPrice",
		header: "Precio de costo",
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return <span>{formatCurrency(value)}</span>;
		},
	},
	{
		accessorKey: "salePrice",
		header: "Precio de venta",
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return <span>{formatCurrency(value)}</span>;
		},
	},
	{
		accessorKey: "wholesalePrice",
		header: "Precio mayoreo",
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return <span>{formatCurrency(value)}</span>;
		},
	},
	{
		accessorKey: "stock",
		header: "Stock",
	},
	{
		accessorKey: "minStock",
		header: "Stock mínimo",
	},
	{
		accessorKey: "actions",
		header: "Acciones",
		cell: ({ row }) => {
			const product = row.original as Omit<Product, "barcode"> & {
				barcode: string;
			};

			return (
				<div className="space-x-2 w-full">
					<EditProduct product={product} />
					<DeleteProduct
						productId={product.id}
						description={product.description}
					/>
				</div>
			);
		},
	},
];
