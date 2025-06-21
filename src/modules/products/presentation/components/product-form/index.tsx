import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createProductDto,
	type CreateProductDto,
} from "@/modules/products/application/models/products.schema";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { CategoriesSelect } from "../categories-select";
import type { Product } from "@/modules/products/application/models";

interface Props {
	onSubmit: (data: CreateProductDto) => void;
	isPending: boolean;
	closeDialog?: () => void;
	product?: Omit<Product, "barcode"> & { barcode: string };
}

const defaultValues: CreateProductDto = {
	barcode: "",
	description: "",
	costPrice: 0,
	salePrice: 0,
	wholesalePrice: 0,
	stock: 0,
	minStock: 0,
};

export function ProductForm({
	closeDialog,
	onSubmit,
	isPending,
	product,
}: Props) {
	const form = useForm<CreateProductDto>({
		resolver: zodResolver(createProductDto),
		defaultValues: product
			? {
					barcode: product.barcode,
					description: product.description,
					costPrice: product.costPrice,
					salePrice: product.salePrice,
					wholesalePrice: product.wholesalePrice,
					stock: product.stock,
					minStock: product.minStock,
					categoryId: product.categoryId,
				}
			: defaultValues,
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		onSubmit(data);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-5">
				<fieldset className="flex justify-between gap-x-2">
					<FormInput
						label="Código de barras"
						name="barcode"
						control={form.control}
					/>
					<FormInput
						label="Descripción"
						name="description"
						control={form.control}
					/>
				</fieldset>
				<fieldset className="flex justify-between gap-x-2">
					<FormInput
						label="Precio de compra"
						name="costPrice"
						type="number"
						min={0}
						control={form.control}
					/>
					<FormInput
						label="Precio de venta"
						name="salePrice"
						type="number"
						min={0}
						control={form.control}
					/>
					<FormInput
						label="Precio de mayoreo"
						name="wholesalePrice"
						type="number"
						min={0}
						control={form.control}
					/>
				</fieldset>
				<fieldset className="flex justify-between gap-x-2 items-center">
					<FormInput
						label="Stock"
						name="stock"
						type="number"
						min={0}
						control={form.control}
					/>
					<FormInput
						label="Stock mínimo"
						name="minStock"
						type="number"
						min={0}
						control={form.control}
					/>
				</fieldset>
				<fieldset>
					<CategoriesSelect
						label="Categorías"
						name="categoryId"
						control={form.control}
						setValue={(value) => form.setValue("categoryId", value)}
					/>
				</fieldset>
				<fieldset className="flex gap-x-2">
					{closeDialog && (
						<Button
							type="button"
							variant="secondary"
							className="flex-1"
							onClick={closeDialog}
							disabled={isPending}
						>
							Cerrar
						</Button>
					)}
					<Button type="submit" className="flex-1" disabled={isPending}>
						{product ? "Actualizar" : "Agregar"}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}
