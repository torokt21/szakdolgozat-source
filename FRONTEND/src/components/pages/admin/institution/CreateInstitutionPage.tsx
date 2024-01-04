import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { InferType, date, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditInstitutionForm from "./CreateEditInstitutionForm";
import Institution from "../../../../utils/types/Institution";
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

					<CreateEditInstitutionForm editing={false} onSubmit={onSubmit} />
				</Box>
			</Paper>
		</Container>
	);
}
