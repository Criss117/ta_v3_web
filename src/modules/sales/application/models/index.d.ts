import type { Product } from "@/modules/products/application/models";

export type TicketProduct = Pick<
	Product,
	"barcode" | "id" | "description" | "salePrice" | "wholesalePrice" | "stock"
> & {
	currentPrice: number;
	currentStock: number;
};

export type TicketType = "cash" | "credit";
