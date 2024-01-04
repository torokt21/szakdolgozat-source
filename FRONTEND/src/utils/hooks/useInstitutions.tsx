//import { InstitutionDto } from "../dtos/InstitutionDto";

import Institution from "../types/Institution";
import useApiResource from "./useApiResource";

const useInstitutions = () => {
	return useApiResource<Institution[]>({ url: "Institution", dtoMapper: (x) => x });
};

export default useInstitutions;
