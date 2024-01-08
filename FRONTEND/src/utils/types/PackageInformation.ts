import PackageRequirement from "./PackageRequirement";

type PackageInformation = {
	Id: string;
	Name: string;
	Description: string;
	Price: number;
	Requirements: PackageRequirement[];
	Orderable: boolean;
	PhotographerId: string | null;
};

export default PackageInformation;
