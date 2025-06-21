import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { Category } from "@/modules/products/application/models";
import {
	categoryFormDto,
	type CategoryFormDto,
} from "@/modules/products/application/models/categories.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
	category?: Category;
	isPending: boolean;
	onSubmit: (data: CategoryFormDto) => void;
	closeDialog?: () => void;
}
const defaultValues = {
	name: "",
	description: "",
};

export function CategoryForm({
	isPending,
	category,
	onSubmit,
	closeDialog,
}: Props) {
	const form = useForm<CategoryFormDto>({
		resolver: zodResolver(categoryFormDto),
		defaultValues: category
			? {
					name: category.name,
					description: category.description,
				}
			: defaultValues,
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		onSubmit(data);
	});

	return (
		<Form {...form}>
			<form className="space-y-5">
				<fieldset className="flex flex-col gap-y-2">
					<FormInput
						control={form.control}
						name="name"
						label="Nombre"
						description="El nombre de la categoría"
					/>
				</fieldset>
				<fieldset className="flex gap-x-2">
					<Button
						type="button"
						className="flex-1"
						disabled={isPending}
						onClick={handleSubmit}
					>
						{category ? "Actualizar" : "Agregar"}
					</Button>
					{closeDialog && (
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={closeDialog}
							disabled={isPending}
						>
							Cerrar
						</Button>
					)}
				</fieldset>
			</form>
		</Form>
	);
}
