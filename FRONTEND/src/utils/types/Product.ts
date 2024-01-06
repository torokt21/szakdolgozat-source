export type ProductType = "Printed" | "Gift";

export function PrintProductType(type: ProductType) {
	switch (type) {
		case "Gift":
			return "Ajándéktárgy";
		case "Printed":
			return "Papírkép";
		default:
			throw new Error("Ismeretlen típus.");
	}
}

type Product = {
	id: number;
	name: string;
	description: string | null;
	photographerId: string;
	price: number;
	type: ProductType;
	orderable: boolean;
};

export default Product;
