import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useInstitutions from "../../../../utils/hooks/useInstitutions";

export default function ListInstitutions() {
	const [institutions, loading, error] = useInstitutions();
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
				<Button component={Link} to="new" variant="contained" color="primary">
					Új intézmény
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="Intézmények listája">
					<TableHead>
						<TableRow>
							<TableCell>Kód</TableCell>
							<TableCell>Név</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{institutions.map((inst) => (
							<TableRow
								key={inst.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th">{inst.shortcode}</TableCell>
								<TableCell component="th" scope="row">
									{inst.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
