import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

export type PaymentSummary =
	inferRouterOutputs<AppRouter>["payments"]["findManyByClient"]["items"][number];
export type InstallmentPlanSummary =
	inferRouterOutputs<AppRouter>["installments"]["findAllByClient"][number];
