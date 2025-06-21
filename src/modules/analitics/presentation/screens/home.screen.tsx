import { CardsSection } from "../section/cards.section";
import { ChartSection } from "../section/chart.section";

export function HomeScreen() {
	return (
		<div className="flex flex-1 flex-col mx-10">
			<div className="flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<CardsSection />
					<ChartSection />
				</div>
			</div>
		</div>
	);
}
