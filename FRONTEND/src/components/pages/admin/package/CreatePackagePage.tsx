import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditPackageForm from "./CreateEditPackageForm";
import PackageInformation from "../../../../utils/types/PackageInformation";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";

export default function CreatePackagePage() {
	const [error, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	function onSubmit(values: PackageInformation) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.post(process.env.REACT_APP_API_URL + "Package", JSON.stringify(values))
			.then(() => navigate("/admin/package"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/product" variant="outlined">
					Vissza
				</Button>
			</Box>

			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1" mb={2}>
						Új csomag
					</Typography>

					{error && (
						<Box textAlign="center" color="red" my={3}>
							{error}
						</Box>
					)}

					<CreateEditPackageForm editing={false} onSubmit={onSubmit} />
				</Box>
			</Paper>
		</Container>
	);
}
