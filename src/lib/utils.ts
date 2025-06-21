import type { InstallmentModality } from "@/modules/sales/application/models/schemas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMonth, addDay } from "@formkit/tempo";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
	return value.toLocaleString("es-ES", {
		style: "currency",
		currency: "COP",
	});
}

export function sleep(ms = 500) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDefaultFirstPayment(modality: InstallmentModality) {
	switch (modality) {
		case "weekly":
			return addDay(new Date(), 7);
		case "monthly":
			return addMonth(new Date());
		case "biweekly":
			return addDay(new Date(), 14);
	}
}

export function translateModality(modality: InstallmentModality) {
	switch (modality) {
		case "weekly":
			return "Semanal";
		case "monthly":
			return "Mensual";
		case "biweekly":
			return "Bimensual";
	}
}
