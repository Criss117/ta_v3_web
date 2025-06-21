import { useMutateProducts } from "../../application/hooks/use.mutate-products";
import { ProductFormDialog } from "./product-form/dialog";

export function CreateProduct() {
	const { create } = useMutateProducts();

	return (
		<ProductFormDialog isPending={create.isPending} onSubmit={create.mutate} />
	);
}
