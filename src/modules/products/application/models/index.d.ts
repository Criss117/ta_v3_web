import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/integrations/trpc/index.mjs";

export type Product = inferRouterOutputs<AppRouter>["products"]["findOneBy"];
export type Category =
	inferRouterOutputs<AppRouter>["categories"]["findMany"]["items"][number];
