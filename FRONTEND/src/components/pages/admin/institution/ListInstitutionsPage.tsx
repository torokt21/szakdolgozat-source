import {
	Badge,
	Box,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ClassIcon from "@mui/icons-material/Class";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import Institution from "../../../../utils/types/Institution";
import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useInstitutions from "../../../../utils/hooks/useInstitutions";

export default function ListInstitutions() {
	const navigate = useNavigate();
	const {
		data: [institutions, loading, error],
		refetch,
	} = useInstitutions();

	function handleDelete(institution: Institution) {
		if (confirm(`Biztosan törölni akarod a(z) ${institution.name} nevű intézményt?`)) {
			useAxiosClient()
				.delete(process.env.REACT_APP_API_URL + "Institution/" + institution.id)
				.then(() => refetch());
		}
	}

	function handleEdit(institution: Institution) {
		navigate(institution.id.toString());
	}

	const hasRole = useBoundStore().hasRole("Admin");
	if (!hasRole) return <Navigate to="/admin" />;

	if (error)
		return (
			<Box textAlign="center">
				<Typography>Váratlan hiba</Typography>
			</Box>
		);

	if (loading)
		return (
			<Box m={5} textAlign="center">
				<CircularProgress />
			</Box>
		);

	return (
		<Container>
			<Box mb={3}>
				<Grid container>
					<Grid item xs={12} sm={7} lg={10}>
						<Typography component="h1" variant="h3">
							Intézmények
						</Typography>
					</Grid>

					<Grid item xs={12} sm={5} lg={2} textAlign="right">
						<Button
							fullWidth
							component={Link}
							to="new"
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}>
							Új intézmény
						</Button>
					</Grid>
				</Grid>
			</Box>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="Intézmények listája">
					<TableHead>
						<TableRow>
							<TableCell component="th" sx={{ fontWeight: "bold" }}>
								Kód
							</TableCell>
							<TableCell component="th" sx={{ fontWeight: "bold" }}>
								Név
							</TableCell>
							<TableCell component="th" sx={{ fontWeight: "bold" }}>
								Rendelési határidő
							</TableCell>
							<TableCell component="th" align="right" sx={{ fontWeight: "bold" }}>
								Műveletek
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{institutions?.map((inst) => (
							<TableRow
								key={inst.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell width="50px" sx={{ fontFamily: "Monospace" }}>
									{inst.shortcode}
								</TableCell>
								<TableCell scope="row">{inst.name}</TableCell>
								<TableCell>{inst.hardDeadline.format("YYYY-MM-DD")}</TableCell>
								<TableCell align="right" width="200px">
									<Tooltip title="Szerkesztés">
										<IconButton onClick={() => handleEdit(inst)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Szolgáltatások">
										<IconButton>
											<FreeBreakfastIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title={`Osztályok (${inst.classes.length} db)`}>
										<IconButton onClick={() => navigate(inst.id + "/classes")}>
											<Badge
												badgeContent="!"
												color="error"
												invisible={inst.classes.length !== 0}>
												<ClassIcon />
											</Badge>
										</IconButton>
									</Tooltip>
									<Tooltip title="Törlés">
										<IconButton onClick={() => handleDelete(inst)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
