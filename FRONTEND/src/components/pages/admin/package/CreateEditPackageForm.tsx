import "date-fns";

import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import { Switches, TextField, makeValidate } from "mui-rff";
import { boolean, number, object, string } from "yup";

import { Form } from "react-final-form";
import PackageInformation from "../../../../utils/types/PackageInformation";
import React from "react";

const createPackageSchema = object<PackageInformation>().shape({
	Name: string()
		.required("A név megadása kötelező")
		.min(3, "Legalább 3 karakter hosszúnak kell lennie!")
		.max(50, "A hossza nem haladhatja meg az 50 karaktert"),
	Description: string().nullable().max(200, "A hossza nem haladhatja meg a 200 karaktert"),
	Price: number().required("Az ár megadása kötelező").positive("Az ár nem lehet negatív"),
	Orderable: boolean(),
});

type CreateEditPackageFormProps = {
	editing: boolean;
	editingPackage?: PackageInformation;
	onSubmit: (product: PackageInformation) => void;
};

export default function CreateEditPackageForm(props: CreateEditPackageFormProps) {
	const validate = makeValidate(createPackageSchema);

	const initialValues = props.editing ? props.editingPackage : { Orderable: true };

	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={initialValues}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Switches
								name="Orderable"
								required={true}
								data={{ label: "A csomag rendelhető", value: true }}
							/>
						</Grid>
						<Grid item xs={12} md={9}>
							<TextField fullWidth label="Név" name="Name" required={true} />
						</Grid>
						<Grid item xs={12} md={3}>
							<TextField
								fullWidth
								type="number"
								label="Ár"
								name="Price"
								required={true}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Typography variant="caption">Ft</Typography>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Leírás"
								multiline
								name="Description"
							/>
						</Grid>
					</Grid>
					<Box my={3} textAlign="center">
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							{props.editing ? "Szerkesztés" : "Létrehozás"}
						</Button>
					</Box>
				</form>
			)}
		/>
	);
}
