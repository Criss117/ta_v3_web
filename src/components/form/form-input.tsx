import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> extends React.ComponentProps<"input"> {
	label: string;
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
}

export function FormInput<T extends FieldValues>({
	label,
	description,
	control,
	name,
	hidden,
	...props
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("w-full", hidden && "hidden")}>
					<FormLabel>
						{label}
						{props.required && <span className="text-red-500">*</span>}
					</FormLabel>

					<FormControl>
						<Input {...field} {...props} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
