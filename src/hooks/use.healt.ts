import { checkApi } from "@/lib/check-api";
import { useEffect, useState, useTransition } from "react";

export function useHealth() {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		startTransition(async () => {
			try {
				const res = await checkApi();

				if (!res.ok) {
					setIsError(true);
				}
			} catch (error) {
				setIsError(true);
			}
		});
	}, []);

	return {
		isPending,
		isError,
	};
}
