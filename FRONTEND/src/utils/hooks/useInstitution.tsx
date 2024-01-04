//import { InstitutionDto } from "../dtos/InstitutionDto";

import Institution from "../types/Institution";
import useApiResource from "./useApiResource";

const useInstitutions = (id: number) => {
	return useApiResource<Institution>({ url: "Institution/" + id, dtoMapper: (x) => x });
};

export default useInstitutions;
