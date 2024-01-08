// TODO remove this
/* eslint-disable no-mixed-spaces-and-tabs */

import "date-fns";

import { Box, Button, CircularProgress, Grid, InputAdornment, Typography } from "@mui/material";
import {
	DataGrid,
	GridColDef,
	GridValueFormatterParams,
	GridValueGetterParams,
	GridValueSetterParams,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Switches, TextField, makeValidate } from "mui-rff";
import { boolean, number, object, string } from "yup";

import { Form } from "react-final-form";
import { Navigate } from "react-router-dom";
import PackageInformation from "../../../../utils/types/PackageInformation";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useProducts from "../../../../utils/hooks/useProducts";

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
	onSubmit: (package_: PackageInformation, packageRequirement: unknown[]) => void;
};

const columns: GridColDef[] = [
	{ field: "Name", headerName: "Név", width: 300, sortable: true },
	{
		field: "Visible",
		headerName: "Elérhetőség",
		width: 130,
		sortable: true,
		valueGetter: (params: GridValueGetterParams) =>
			params.row.Orderable ? "Rendelhető" : "Nem rendelhető",
	},
	{
		field: "Quantity",
		headerName: "Mennyiség",
		width: 130,
		sortable: false,
		editable: true,
		valueFormatter: (params: GridValueFormatterParams<number>) => {
			if (params.value == null) {
				return "";
			}
			return `${params.value.toLocaleString()} db`;
		},
		valueSetter: (params: GridValueSetterParams) => {
			if (isNaN(params.value) || !Number.isInteger(Number(params.value))) return params.row;
			return { ...params.row, Quantity: Number(params.value) };
		},
	},
];

export default function CreateEditPackageForm(props: CreateEditPackageFormProps) {
	const validate = makeValidate(createPackageSchema);

	const userId = useBoundStore().user?.id;
	const {
		data: [products, loading, error],
	} = useProducts();
	const [rows, setRows] = useState<ProductRow[]>([]);

	function handleSubmit(package_: PackageInformation) {
		props.onSubmit(
			package_,
			rows.map((r) => ({
				quantity: r.Quantity,
				productId: r.Id,
			}))
		);
	}

	useEffect(() => {
		if (!products) return;

		setRows(
			products.map((p) => {
				return {
					Id: p.Id,
					Name: p.Name,
					Quantity: !props.editing
						? 0
						: props.editingPackage?.Requirements.find((r) => r.ProductId == p.Id)
								?.Quantity ?? 0,
					Orderable: p.Orderable,
				};
			})
		);
	}, [products, props.editingPackage?.Id]);

	if (loading) return <CircularProgress />;

	if (error || !products) return <>Váratlan hiba</>;

	if (props.editingPackage?.PhotographerId != userId) <Navigate to="/admin/package" />;

	const initialValues = props.editing ? props.editingPackage : { Orderable: true };

	return (
		<Form
			onSubmit={handleSubmit}
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

					<Box mt={2} style={{ width: "100%", height: 400 }}>
						<Box>A csomag tartalma:</Box>
						<DataGrid
							rows={rows}
							columns={columns}
							getRowId={(product) => product.Id}
							hideFooter={true}
							processRowUpdate={(newRow) => {
								const copy = [...rows];
								const product = copy.find((f) => f.Id === newRow.Id);
								product!.Quantity = newRow.Quantity;
								setRows(copy);
								return newRow;
							}}
						/>
					</Box>
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

type ProductRow = {
	Name: string;
	Id: number;
	Orderable: boolean;
	Quantity: number;
};
