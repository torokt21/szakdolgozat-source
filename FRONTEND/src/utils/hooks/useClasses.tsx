//import { InstitutionDto } from "../dtos/InstitutionDto";

import Class from "../types/Class";
import useApiResource from "./useApiResource";

const useDisplayClasses = (institutionId: number) => {
	return useApiResource<Class[]>({ url: "DisplayClass/" + institutionId, dtoMapper: (x) => x });
};

export default useDisplayClasses;
