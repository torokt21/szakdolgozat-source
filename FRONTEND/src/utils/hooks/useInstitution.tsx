//import { InstitutionDto } from "../dtos/InstitutionDto";

import Class from "../types/Class";
import Institution from "../types/Institution";
import dayjs from "dayjs";
import useApiResource from "./useApiResource";

export type InstitutionDto = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string;
	photographerId: string;
	softDeadline: Date;
	hardDeadline: Date;
	expectedShippingStart: Date;
	expectedShippingEnd: Date;
	displayMessage: string;
	classes: Class[];
};

export function institutionMapper(response: InstitutionDto): Institution {
	return {
		id: response.id,
		name: response.name,
		shortcode: response.shortcode,
		contactInfo: response.contactInfo,
		photographerId: response.photographerId,
		softDeadline: dayjs(response.softDeadline),
		hardDeadline: dayjs(response.hardDeadline),
		expectedShippingStart: dayjs(response.expectedShippingStart),
		expectedShippingEnd: dayjs(response.expectedShippingEnd),
		displayMessage: response.displayMessage,
		classes: response.classes,
	};
}

const useInstitution = (id: number) => {
	return useApiResource<Institution, InstitutionDto>({
		url: "Institution/" + id,
		dtoMapper: institutionMapper,
	});
};

export default useInstitution;
