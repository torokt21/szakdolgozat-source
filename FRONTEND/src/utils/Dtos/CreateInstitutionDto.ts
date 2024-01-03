import { InferType, date, object, ref, string } from "yup";

export const createInstitutionDtoSchema = object().shape({
	name: string()
		.required("A név megadása kötelező")
		.min(3, "Legalább 3 karakter hosszúnak kell lennie!")
		.max(64, "A hossza nem haladhatja meg a 64 karaktert"),
	shortcode: string()
		.required("A kód megadása kötelező")
		.uppercase("Csak nagybetűket tartalmazhat")
		.length(3, "A kód hossza 3 karakter kell, hogy legyen"),
	contactInfo: string(),
	softDeadline: date().required("A mező kitöltése kötelező"),
	hardDeadline: date().required("A mező kitöltése kötelező"),
	expectedShippingStart: date().required("A mező kitöltése kötelező"),
	expectedShippingEnd: date()
		.required("A mező kitöltése kötelező")
		.min(ref("expectedShippingStart"), "A kiszállítási idő vége nincs az eleje után"),
	displayMessage: string(),
});

export type CreateInstitutionDto = InferType<typeof createInstitutionDtoSchema>;
