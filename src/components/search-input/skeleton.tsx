import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchInputSkeleton() {
	return (
		<div className="relative flex-1">
			<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input placeholder="Buscar productos..." className="pl-8" disabled />
			<Button variant="ghost" size="icon" className="absolute right-2 top-0">
				<X />
			</Button>
		</div>
	);
}
