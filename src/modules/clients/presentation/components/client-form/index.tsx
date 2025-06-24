import { useForm } from "react-hook-form";
import {
	createClientDto,
	type CreateClientDto,
} from "@/modules/clients/application/models/create-client.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import type { CompleteClient } from "@/modules/clients/application/models";
import { SelectInput } from "@/components/form/select-input";

interface Props {
	isPending: boolean;
	client?: CompleteClient;
	onSubmit: (data: CreateClientDto) => void;
	closeDialog?: () => void;
}

const numOfInstallments = Array.from({ length: 12 }, (_, i) => ({
	id: (i + 1).toString(),
	label: `${(i + 1).toString()} ${i + 1 === 1 ? "couta (Pago único)" : "cuotas"}`,
}));

const frecuencyItems = [
	{ id: "weekly", label: "Semanal" },
	{ id: "biweekly", label: "Quincenal" },
	{ id: "monthly", label: "Mensual" },
];

export function ClientForm({
	onSubmit,
	isPending,
	closeDialog,
	client,
}: Props) {
	const form = useForm<CreateClientDto>({
		resolver: zodResolver(createClientDto),
		defaultValues: client
			? {
					fullName: client.fullName,
					creditLimit: client.creditLimit,
					clientCode: client.clientCode,
					address: client.address,
					email: client.email,
					phone: client.phone,
					globalInstallmentModality: client.globalInstallmentModality,
					globalNumberOfInstallments: client.globalNumberOfInstallments,
				}
			: {
					fullName: "",
					creditLimit: 0,
					clientCode: "",
					address: "",
					email: "",
					phone: "",
					globalInstallmentModality: "monthly",
					globalNumberOfInstallments: 1,
				},
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		onSubmit(data);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-5" noValidate>
				<fieldset className="grid grid-cols-2 gap-y-4 gap-x-5">
					<FormInput
						control={form.control}
						name="clientCode"
						label="Código del cliente"
						placeholder="Código del cliente"
						required
						type="text"
					/>
					<FormInput
						control={form.control}
						name="fullName"
						label="Nombre completo"
						placeholder="Nombre completo"
						type="text"
					/>
					<FormInput
						control={form.control}
						name="email"
						label="Correo electrónico"
						placeholder="Correo electrónico"
						type="email"
					/>
					<FormInput
						control={form.control}
						name="phone"
						label="Número de teléfono"
						placeholder="Número de teléfono"
						type="number"
					/>
					<FormInput
						control={form.control}
						name="address"
						label="Dirección"
						placeholder="Dirección"
						type="text"
					/>
					<FormInput
						control={form.control}
						name="creditLimit"
						label="Límite de crédito"
						placeholder="Límite de crédito"
						type="number"
						min={0}
						required
					/>
					<SelectInput
						control={form.control}
						name="globalInstallmentModality"
						label="Modalidad de cuotas"
						placeholder="Modalidad de cuotas"
						items={frecuencyItems}
					/>
					<SelectInput
						control={form.control}
						name="globalNumberOfInstallments"
						label="Cantidad de coutoas"
						placeholder="Cantidad de coutoas"
						items={numOfInstallments}
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
						{client ? "Editar" : "Crear"}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}
