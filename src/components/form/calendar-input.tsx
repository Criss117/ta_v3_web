import { CalendarIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "@formkit/tempo";
import { Calendar } from "../ui/calendar";

interface Props<T extends FieldValues> extends React.ComponentProps<"input"> {
	label: string;
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
}
export function CalendarInput<T extends FieldValues>({
	control,
	label,
	description,
	name,
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-full pl-3 text-left font-normal",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value ? (
										format({
											date: field.value,
											format: "full",
											locale: "es-ES",
										})
									) : (
										<span>Seleccione una fecha</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								defaultMonth={field.value}
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={{
									before: new Date(),
								}}
							/>
						</PopoverContent>
					</Popover>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
