import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
	payDebtDto,
	type PayDebtDto,
} from "@/modules/clients/application/models/pay-debt.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { useMutatePayments } from "@/modules/clients/application/hooks/use.mutate-payments";
import { BanknoteArrowUpIcon } from "lucide-react";

interface Props {
	clientId: string;
	hasDebt: boolean;
}

export function PayDebt({ clientId, hasDebt }: Props) {
	const [open, setOpen] = useState(false);
	const { create } = useMutatePayments();
	const form = useForm<PayDebtDto>({
		resolver: zodResolver(payDebtDto),
		defaultValues: {
			amount: 0,
			type: "pay_debt",
			clientId,
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		if (!hasDebt) return;
		create.mutate(data, {
			onSuccess: () => {
				form.reset();
				setOpen(false);
			},
		});
	});

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				if (value === false) {
					form.reset();
				}
				setOpen(value);
			}}
		>
			<DialogTrigger asChild>
				<Button
					className="flex-1 rounded-sm flex-row gap-x-1 items-center"
					disabled={!hasDebt}
				>
					<BanknoteArrowUpIcon />
					Abonar
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-sm mx-auto">
				<DialogHeader>
					<DialogTitle>Abonar</DialogTitle>
					<DialogDescription>¿Cuánto desea abonar?</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={onSubmit} id="pay-debt-form">
						<FormInput
							control={form.control}
							name="amount"
							label="Cantidad"
							placeholder="Cantidad a abonar"
						/>
					</form>
				</Form>

				<DialogFooter className="flex-row gap-x-2">
					<DialogClose asChild>
						<Button variant="outline" className="flex-1" type="submit">
							Cancelar
						</Button>
					</DialogClose>
					<Button
						className="flex-1 flex-row gap-x-1.5"
						disabled={create.isPending}
						form="pay-debt-form"
					>
						Continuar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
