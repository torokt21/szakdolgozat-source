import "date-fns";

import { Box, Button, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import Product, { PrintProductType } from "../../../../utils/types/Product";
import { Select, TextField, makeValidate } from "mui-rff";
import { number, object, string } from "yup";

import { Form } from "react-final-form";
import React from "react";

const createProductSchema = object<Product>().shape({
	name: string()
		.required("A név megadása kötelező")
		.min(3, "Legalább 3 karakter hosszúnak kell lennie!")
		.max(50, "A hossza nem haladhatja meg az 50 karaktert"),
	description: string().nullable().max(200, "A hossza nem haladhatja meg a 200 karaktert"),
	price: number().required("Az ár megadása kötelező").positive("Az ár nem lehet negatív"),
	type: string().required().oneOf(["Printed", "Gift"]),
});

type CreateEditProductFormProps = {
	editing: boolean;
	editingProduct?: Product;
	onSubmit: (product: Product) => void;
};

export default function CreateEditProductForm(props: CreateEditProductFormProps) {
	const validate = makeValidate(createProductSchema);

	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.editingProduct}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField fullWidth label="Név" name="name" required={true} />
						</Grid>
						<Grid item xs={12} md={3}>
							<TextField
								fullWidth
								type="number"
								label="Ár"
								name="price"
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
						<Grid item xs={12} md={3}>
							<Select name="type" label="Típus">
								<MenuItem value="Printed">{PrintProductType("Printed")}</MenuItem>
								<MenuItem value="Gift">{PrintProductType("Gift")}</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Leírás"
								multiline
								name="description"
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
