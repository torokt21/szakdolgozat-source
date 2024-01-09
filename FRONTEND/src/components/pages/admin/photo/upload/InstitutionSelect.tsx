import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";

import Institution from "../../../../../utils/types/Institution";
import useInstitutions from "../../../../../utils/hooks/useInstitutions";

type InstitutionSelectProps = {
	selected?: Institution;
	onSelectionChange: (institution: Institution | undefined) => void;
};

export default function InstitutionSelect(props: InstitutionSelectProps) {
	const {
		data: [institutions, loading, error],
	} = useInstitutions();

	const handleChange = (event: SelectChangeEvent) => {
		props.onSelectionChange(institutions!.find((i) => i.Id == Number(event.target.value)));
	};

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
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Intézmény</InputLabel>
			<Select
				value={props.selected ? props.selected.Id.toString() : ""}
				label="Intézmény"
				onChange={handleChange}>
				{institutions.map((i) => (
					<MenuItem key={i.Id} value={i.Id}>
						{i.Name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
