import "date-fns";

import { Box, Button, Grid } from "@mui/material";
import { DatePicker, TextField, makeValidate } from "mui-rff";
import { date, object, ref, string } from "yup";

import { Form } from "react-final-form";
import Institution from "../../../../utils/types/Institution";
import React from "react";

// TODO make date dayjs https://github.com/jquense/yup/issues/312
const createInstitutionDtoSchema = object<Institution>().shape({
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

type CreateEditInstitutionFormProps = {
	editing: boolean;
	onSubmit: (institution: Institution) => void;
};

export default function CreateEditInstitutionForm(props: CreateEditInstitutionFormProps) {
	const validate = makeValidate(createInstitutionDtoSchema);

	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			render={({ handleSubmit, values }) => (
				<form onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<TextField
								fullWidth
								label="Azonosító kód"
								name="shortcode"
								required={true}
								inputProps={{
									onChange: (
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => {
										e.target.value = e.target.value.toUpperCase();
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} md={9}>
							<TextField fullWidth label="Név" name="name" required={true} />
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Kontakt infó, megjegyzések"
								multiline
								name="contactInfo"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Megjelenített rendelési határidő"
								name="softDeadline"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker label="Valódi rendelési határidő" name="hardDeadline" />
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Várható kiszállítás (tól)"
								name="expectedShippingStart"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Várható kiszállítás (ig)"
								name="expectedShippingEnd"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Üzenet a képek fölött"
								multiline
								name="displayMessage"
							/>
						</Grid>
					</Grid>
					<Box my={3} textAlign="center">
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							Létrehozás
						</Button>
					</Box>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</form>
			)}
		/>
	);
}
