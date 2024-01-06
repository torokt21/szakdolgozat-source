import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Class from "../../../../utils/types/Class";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useClasses from "../../../../utils/hooks/useClasses";
import useInstitution from "../../../../utils/hooks/useInstitution";

export default function EditClassesPage() {
	const { institutionId } = useParams();
	const userId = useBoundStore().user?.id;

	const {
		data: [institution, instLoading, instError],
	} = useInstitution(Number(institutionId));

	const {
		data: [classes, classesLoading, classesError],
		refetch,
	} = useClasses(Number(institutionId));

	function handleDelete(clas: Class) {
		if (confirm(`Biztosan törölni akarod a(z) ${clas.name} nevű osztályt?`)) {
			useAxiosClient()
				.delete(process.env.REACT_APP_API_URL + "Class/" + clas.id)
				.then(() => refetch());
		}
	}

	if (instLoading || classesLoading) return <CircularProgress />;

	if (instError || classesError || !institution || !classes) return <>Váratlan hiba</>;

	if (institution.photographerId !== userId) return <Navigate to={`/admin/institution`} />;

	return (
		<Container maxWidth="sm">
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
						<TableContainer>
							<Table>
								<TableBody>
									{classes.map((clas) => (
										<TableRow>
											<TableCell align="left">{clas.name}</TableCell>
											<TableCell align="right">
												{" "}
												<Tooltip title="Törlés">
													<IconButton onClick={() => handleDelete(clas)}>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>

					<AddClassForm refetch={refetch} institutionId={institution.id} />
				</Box>
			</Paper>
		</Container>
	);
}

type AddClassFormProps = {
	refetch: () => void;
	institutionId: number;
};

function AddClassForm(props: AddClassFormProps) {
	const [newClassName, setNewClassName] = useState("");

	function handleAddClass() {
		useAxiosClient()
			.post(
				process.env.REACT_APP_API_URL + "Class",
				JSON.stringify({ name: newClassName, institutionId: props.institutionId })
			)
			.then(() => {
				setNewClassName("");
				props.refetch();
			})
			.catch(() => alert("Sikertelen hozzáadás"));
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={8}>
				<TextField
					fullWidth
					size="small"
					label="Új osztály"
					value={newClassName}
					onChange={(e) => setNewClassName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} md={4}>
				<Button
					fullWidth
					onClick={handleAddClass}
					variant="contained"
					startIcon={<AddIcon />}>
					Hozzáadás
				</Button>
			</Grid>
		</Grid>
	);
}
