import { Box, CircularProgress, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

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
			<Box textAlign="center" pb={5}>
				<Button
					component={Link}
					to="new"
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}>
					Új intézmény
				</Button>
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
								<TableCell align="right" width="200px">
									<Tooltip title="Szerkesztés">
										<IconButton>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Szolgáltatások">
										<IconButton>
											<FreeBreakfastIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Osztályok">
										<IconButton>
											<ClassIcon />
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
