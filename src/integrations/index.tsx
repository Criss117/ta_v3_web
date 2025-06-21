import { TanstackQueryProvider } from "@/integrations/tanstack-query/provider";
import { TRPCProvider } from "@/integrations/trpc/provider";
import { ThemeProvider } from "./theme/provider";

export function Integrations({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<TanstackQueryProvider>
				<TRPCProvider>{children}</TRPCProvider>
			</TanstackQueryProvider>
		</ThemeProvider>
	);
}
