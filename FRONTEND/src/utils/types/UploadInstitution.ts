import Institution from "./Institution";
import { UploadClass } from "./UploadClass";

export type UploadInstitution = {
	institution: Institution;
	classes: UploadClass[];
};
