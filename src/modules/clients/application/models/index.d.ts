import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

export type SimpleClient =
	inferRouterOutputs<AppRouter>["clients"]["findMany"][number];
export type CompleteClient =
	inferRouterOutputs<AppRouter>["clients"]["findOneBy"];
export type Ticket =
	inferRouterOutputs<AppRouter>["tickets"]["findManyByClient"][number];
