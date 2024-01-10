import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";

import Institution from "../../../../../utils/types/Institution";
import useInstitutions from "../../../../../utils/hooks/useInstitutions";
import { useState } from "react";

type InstitutionSelectProps = {
	onSubmit: (institution: Institution | undefined) => void;
};

export default function InstitutionSelect(props: InstitutionSelectProps) {
	const [institution, setInstitution] = useState<Institution | undefined>();
	const {
		data: [institutions, loading, error],
	} = useInstitutions();

	function handleSubmit() {
		if (institution) props.onSubmit(institution);
	}

	if (loading)
		return (
			<Box m={5} textAlign="center">
				<CircularProgress />
			</Box>
		);

	if (error || !institutions)
		return (
			<Box textAlign="center">
				<Typography>Váratlan hiba</Typography>
			</Box>
		);

	return (
		<Container maxWidth="sm">
			<Paper>
				<Box p={3}>
					<Box mb={2}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Intézmény</InputLabel>
							<Select
								value={institution?.Id.toString() ?? ""}
								label="Intézmény"
								onChange={(event) =>
									setInstitution(
										institutions!.find(
											(i) => i.Id == Number(event.target.value)
										)
									)
								}>
								{institutions.map((i) => (
									<MenuItem key={i.Id} value={i.Id}>
										{i.Name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<Button variant="contained" fullWidth onClick={handleSubmit}>
						Kiválasztás
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
