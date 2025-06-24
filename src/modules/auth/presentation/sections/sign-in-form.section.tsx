import { Link } from "@tanstack/react-router";

export function SignInFormSection() {
	return (
		<>
			{/* <Form {...form}>
				<form onSubmit={form.onSubmit} className="space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<p className="relative">
										Email
										<span className="absolute text-red-600 text-2xl -top-3 left-9">
											*
										</span>
									</p>
								</FormLabel>
								<FormControl>
									<Input placeholder="example@email.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<div className="flex items-center justify-between w-full">
										<p className="relative">
											Contraseña{" "}
											<span className="absolute text-red-600 text-2xl -top-3">
												*
											</span>
										</p>
										<Link to="/auth/sign-in" className="hover:underline">
											Olvidaste tu contraseña?
										</Link>
									</div>
								</FormLabel>
								<FormControl>
									<Input placeholder="**********" type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={form.isPending}>
						{form.isPending && <LoaderIcon className="animate-spin" />}
						Iniciar Sesión
					</Button>
					<Button type="button" className="w-full">
						Crear cuenta
					</Button>
				</form>
			</Form> */}
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/auth/sign-up" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</>
	);
}
