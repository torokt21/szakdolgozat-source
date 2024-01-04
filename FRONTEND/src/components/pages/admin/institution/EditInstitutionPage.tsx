import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditInstitutionForm from "./CreateEditInstitutionForm";
import Institution from "../../../../utils/types/Institution";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";

export default function EditInstitutionPage() {
	const { id } = useParams();
	const [error, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	function onSubmit(values: Institution) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.put(process.env.REACT_APP_API_URL + "Institution/" + id, JSON.stringify(values))
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
						Intézmény szerkesztése
					</Typography>

					{error && (
						<Box textAlign="center" color="red" my={3}>
							{error}
						</Box>
					)}

					<CreateEditInstitutionForm editing={true} onSubmit={onSubmit} />
				</Box>
			</Paper>
		</Container>
	);
}
