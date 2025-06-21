import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketsListSection from "./tickets-list.section";
import { InstallmentsPlansSection } from "./installment-plans.section";

interface Props {
	clientId: string;
}

const content = [
	{ value: "tickets", label: "Tickets", Component: TicketsListSection },
	{
		value: "installment_plans",
		label: "Planes de Pago",
		Component: InstallmentsPlansSection,
	},
] as const;

export function ClientDataTableSection({ clientId }: Props) {
	return (
		<Tabs defaultValue={content[0].value}>
			<TabsList className="w-1/3">
				{content.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value} className="flex-1">
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
			{content.map((tab) => (
				<TabsContent key={tab.value} value={tab.value}>
					<tab.Component clientId={clientId} />
				</TabsContent>
			))}
		</Tabs>
	);
}
