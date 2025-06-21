import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import type { z } from "zod";

import { signInFormSchema } from "../models/schemas";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../store/auth.store";

export function useSignInForm() {
	const router = useRouter();
	const [isPending, startTransiton] = useTransition();
	const signInEmail = useAuth((s) => s.signInEmail);

	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "cristian@email.com",
			password: "holamundo",
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		startTransiton(async () => {
			await signInEmail({
				email: values.email,
				password: values.password,
				onSuccess: () => {
					router.navigate({
						to: "/dashboard",
					});
				},
				onError: (error) => {
					form.setError("root", {
						message: error.message,
					});
					toast.error(error.message, {
						position: "top-center",
					});
				},
			});
		});
	});

	return {
		...form,
		isPending,
		onSubmit,
	};
}
