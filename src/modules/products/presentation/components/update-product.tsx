import { useMutateProducts } from "@/modules/products/application/hooks/use.mutate-products";
import type { Product } from "@/modules/products/application/models";
import { ProductFormDialog } from "./product-form/dialog";

interface Props {
	product: Omit<Product, "barcode"> & { barcode: string };
}

export function EditProduct({ product }: Props) {
	const { update } = useMutateProducts();

	return (
		<ProductFormDialog
			isPending={update.isPending}
			onSubmit={(data) =>
				update.mutate({
					data,
					productId: product.id,
				})
			}
			product={product}
			triggerVariant="icon"
		/>
	);
}
