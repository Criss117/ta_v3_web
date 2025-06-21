import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClientHeaderSectionSkeleton() {
	return (
		<header>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div className="space-y-1">
						<CardTitle className="text-2xl">
							<Skeleton className="h-8 w-72" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="h-5 w-96" />
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Límite de Crédito</span>
								<span className="font-medium text-normal">
									<Skeleton className="h-5 w-48" />
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Deuda Actual</span>
								<span className="font-medium text-lg">
									<Skeleton className="h-7 w-52" />
								</span>
							</div>
							<Skeleton className="h-2 w-full rounded-full" />

							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Teléfono
									</span>
									<span className="text-sm font-medium">
										<Skeleton className="h-5 w-52" />
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">Email</span>
									<span className="text-sm font-medium">
										<Skeleton className="h-5 w-52" />
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Última Compra
									</span>
									<span className="text-sm font-medium">
										<Skeleton className="h-5 w-52" />
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										ID Cliente
									</span>
									<span className="text-sm font-medium">
										<Skeleton className="h-5 w-52" />
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Dirección
									</span>
									<span className="text-sm font-medium">
										<Skeleton className="h-5 w-52" />
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="grid grid-cols-3 gap-4">
								<Card className="bg-muted/40">
									<CardHeader className="p-4 pb-2">
										<CardDescription>Total Tickets</CardDescription>
									</CardHeader>
									<CardContent className="p-4 pt-0">
										<div className="text-2xl font-bold">
											<Skeleton className="h-5 w-52" />
										</div>
									</CardContent>
								</Card>
								<Card className="bg-muted/40">
									<CardHeader className="p-4 pb-2">
										<CardDescription>Tickets Pendientes</CardDescription>
									</CardHeader>
									<CardContent className="p-4 pt-0">
										<div className="text-2xl font-bold">
											<Skeleton className="h-5 w-52" />
										</div>
									</CardContent>
								</Card>
								<Card className="bg-muted/40">
									<CardHeader className="p-4 pb-2">
										<CardDescription>Tickets Pagados</CardDescription>
									</CardHeader>
									<CardContent className="p-4 pt-0">
										<div className="text-2xl font-bold">
											<Skeleton className="h-5 w-52" />
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</header>
	);
}
