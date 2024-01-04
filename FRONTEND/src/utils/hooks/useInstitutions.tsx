import { InstitutionDto } from "../dtos/InstitutionDto";
import dayjs from "dayjs";
import useApiResource from "./useApiResource";

export type Institution = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string;
	photographerId: string;
	softDeadline: dayjs.Dayjs;
	hardDeadline: dayjs.Dayjs;
	expectedShippingStart: dayjs.Dayjs;
	expectedShippingEnd: dayjs.Dayjs;
	displayMessage: string;
};

const useInstitutions = () => {
	function institutionDtoMapper(dto: InstitutionDto[]): Institution[] {
		return dto.map((r) => {
			return {
				id: r.id,
				name: r.name,
				shortcode: r.shortcode,
				contactInfo: r.contactInfo,
				photographerId: r.photographerId,
				softDeadline: dayjs(r.softDeadline),
				hardDeadline: dayjs(r.hardDeadline),
				expectedShippingStart: dayjs(r.expectedShippingStart),
				expectedShippingEnd: dayjs(r.expectedShippingEnd),
				displayMessage: r.displayMessage,
			} as Institution;
		});
	}

	return useApiResource({ url: "Institution", dtoMapper: institutionDtoMapper });
};

export default useInstitutions;
