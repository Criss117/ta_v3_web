import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Items = {
	value: string;
	label: string;
	description?: string;
};

interface Props<T extends FieldValues> extends React.ComponentProps<"input"> {
	items: Items[];
	name: Path<T>;
	control: Control<T, unknown, T>;
}

export function RadioGroupForm<T extends FieldValues>({
	control,
	name,
	items,
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{items.map((item) => (
								<FormItem key={item.value} className="flex space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value={item.value} id={item.value} />
									</FormControl>
									<div>
										<FormLabel htmlFor={item.value}>{item.label}</FormLabel>
										{item.description && (
											<FormDescription>{item.description}</FormDescription>
										)}
									</div>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
