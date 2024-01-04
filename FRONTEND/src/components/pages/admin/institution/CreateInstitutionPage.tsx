import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { DatePicker, TextField, makeValidate } from "mui-rff";
import { InferType, date, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import { Form } from "react-final-form";
import { Institution } from "../../../../utils/hooks/useInstitutions";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";

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

type CreateInstitutionDto = InferType<typeof createInstitutionDtoSchema>;

export default function CreateInstitutionPage() {
	const [error, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	function onSubmit(values: CreateInstitutionDto) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.post(process.env.REACT_APP_API_URL + "Institution", JSON.stringify(values))
			.then(() => navigate("/admin/institution"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	const validate = makeValidate(createInstitutionDtoSchema);

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/institution" variant="outlined">
					Vissza
				</Button>
			</Box>

			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1" mb={2}>
						Új intézmény
					</Typography>

					{error && (
						<Box textAlign="center" color="red" my={3}>
							{error}
						</Box>
					)}

					<Form
						onSubmit={onSubmit}
						validate={validate}
						render={({ handleSubmit }) => (
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
													e: React.ChangeEvent<
														HTMLInputElement | HTMLTextAreaElement
													>
												) => {
													e.target.value = e.target.value.toUpperCase();
												},
											}}
										/>
									</Grid>
									<Grid item xs={12} md={9}>
										<TextField
											fullWidth
											label="Név"
											name="name"
											required={true}
										/>
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
										<DatePicker
											label="Valódi rendelési határidő"
											name="hardDeadline"
										/>
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
									<Button
										variant="contained"
										color="primary"
										onClick={handleSubmit}>
										Létrehozás
									</Button>
								</Box>
							</form>
						)}
					/>
				</Box>
			</Paper>
		</Container>
	);
}
