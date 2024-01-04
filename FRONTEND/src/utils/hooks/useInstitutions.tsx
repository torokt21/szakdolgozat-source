//import { InstitutionDto } from "../dtos/InstitutionDto";

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
	return useApiResource<Institution[]>({ url: "Institution", dtoMapper: (x) => x });
};

export default useInstitutions;
