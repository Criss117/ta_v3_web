import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from ".";
import type { CreateProductDto } from "@/modules/products/application/models/products.schema";
import type { Product } from "@/modules/products/application/models";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";

interface Props {
	onSubmit: (data: CreateProductDto) => void;
	isPending: boolean;
	product?: Omit<Product, "barcode"> & { barcode: string };
	triggerVariant?: "icon";
}

export function ProductFormDialog({
	onSubmit,
	isPending,
	product,
	triggerVariant,
}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size={triggerVariant === "icon" ? "icon" : "default"}
					variant={triggerVariant === "icon" ? "outline" : "default"}
				>
					{product ? <Edit2Icon /> : <PlusCircleIcon />}
					{triggerVariant !== "icon"
						? product
							? "Editar producto"
							: "Agregar nuevo producto"
						: ""}
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{product ? "Editar un producto" : "Agregar nuevo producto"}
					</DialogTitle>
					<DialogDescription>
						{product
							? "Aquí podrás editar un producto"
							: "Aquí podrás agregar un nuevo producto"}
					</DialogDescription>
				</DialogHeader>
				<ProductForm
					closeDialog={() => setOpen(false)}
					onSubmit={onSubmit}
					isPending={isPending}
					product={product}
				/>
			</DialogContent>
		</Dialog>
	);
}
