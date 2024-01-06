export type ProductType = "Printed" | "Gift";

type Product = {
	id: number;
	name: string;
	description: string | null;
	photographerId: string;
	price: number;
};

export default Product;
