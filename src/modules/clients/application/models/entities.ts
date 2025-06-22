import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

export type PaymentSummary =
	inferRouterOutputs<AppRouter>["clients"]["findManyPayments"]["items"][number];
export type InstallmentPlanSummary =
	inferRouterOutputs<AppRouter>["clients"]["findManyInstallments"][number];
