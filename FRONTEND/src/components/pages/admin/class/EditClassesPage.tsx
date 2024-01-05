import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useInstitution from "../../../../utils/hooks/useInstitution";

export default function EditClassesPage() {
	const { institutionId } = useParams();
	const userId = useBoundStore().user?.id;
	const [newClassName, setNewClassName] = useState("");

	const {
		data: [institution, loading, error],
		refetch,
	} = useInstitution(Number(institutionId));

	function handleAddClass() {
		useAxiosClient()
			.post(
				process.env.REACT_APP_API_URL + "Class",
				JSON.stringify({ name: newClassName, institutionId: institution!.id })
			)
			.then(() => refetch());
	}

	if (loading) return <CircularProgress />;

	if (error || !institution) return <>Váratlan hiba</>;

	if (institution.photographerId !== userId) return <Navigate to={`/admin/institution`} />;

	return (
		<Container>
			{" "}
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/institution" variant="outlined">
					Vissza
				</Button>
			</Box>
			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1">
						{institution?.name}
					</Typography>

					<Typography variant="h5" component="h2" mb={2}>
						Osztályok szerkesztése
					</Typography>

					<Box>
						{institution.classes?.map((clas) => (
							<Box>{clas.name}</Box>
						))}
					</Box>

					<Box>
						<TextField
							size="small"
							label="Új osztály"
							value={newClassName}
							onChange={(e) => setNewClassName(e.target.value)}
						/>
						<Button onClick={handleAddClass}>Hozzáadás</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}
