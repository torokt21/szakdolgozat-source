import {
	Box,
	CircularProgress,
	Collapse,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { FileWithPath, useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Institution from "../../../../../utils/types/Institution";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";
import _ from "lodash";
import useInstitutions from "../../../../../utils/hooks/useInstitutions";

const baseStyle = {
	flex: 1,
	display: "flex",
	//flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const focusedStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

export default function PhotoUploadPage() {
	const [uploadInstitution, setUploadInstitution] = useState<UploadInstitution>();

	const [institution, setInstitution] = useState<Institution | undefined>();

	useEffect(() => {
		if (!institution) return;
		setUploadInstitution({
			institution: institution,
			classes: [],
		});
	}, [institution?.Id]);

	return (
		<Paper>
			<Box p={3}>
				<InstitutionSelect selected={institution} onSelectionChange={setInstitution} />
				<Collapse in={!!institution}>
					<Box py={3}>
						{uploadInstitution && <DropZone uploadInstitution={uploadInstitution} />}
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
}

function InstitutionSelect(props: InstitutionSelectProps) {
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

type DropZoneProps = {
	uploadInstitution: UploadInstitution;
};

function DropZone(props: DropZoneProps) {
	const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
		const [passedFiles, erroredFiles] = _.partition(acceptedFiles, (f) => {
			// Trim slash from the beginning
			if (!f.path) return false;
			const path = f.path.replace(/^\/+|\/+$/g, "");

			const split = path.split("/");

			if (split.length !== 4) return false;

			return true;
		});

		if (
			erroredFiles.length > 0 &&
			!confirm(
				`Az ellenőrzés során ${erroredFiles.length} db kép nem a megfelelő mappában van, mint például a következő:\r\n${erroredFiles[0]?.path}\r\nSzeretné folytatni a további ${passedFiles.length} kép felöltését?`
			)
		)
			return;

		if (passedFiles.length == 0) return;

		const uploadInst = mergeUploadInstitutionModel(props.uploadInstitution, acceptedFiles);

		console.log(uploadInst);
	}, []);
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		noClick: true,
		onDrop: onDrop,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<div className="container">
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Húzza ide a feltölteni kívánt mappát!</p>
			</div>
		</div>
	);
}

type InstitutionSelectProps = {
	selected?: Institution;
	onSelectionChange: (institution: Institution | undefined) => void;
};

function mergeUploadInstitutionModel(uploadInstitution: UploadInstitution, files: FileWithPath[]) {
	// Builds the uploadInstitution object
	files.forEach((file) => {
		const split = file.path!.replace(/^\/+|\/+$/g, "").split("/");
		//const institutionDir = split[0];
		const classDir = split[1];
		const childDir = split[2];

		let foundClass = uploadInstitution.classes.find((c) => c.directory == classDir);
		if (!foundClass) {
			console.log("Did not find", classDir);

			foundClass = { children: [], directory: classDir };
			uploadInstitution.classes = [...uploadInstitution.classes, foundClass];
		}

		let foundChild = foundClass.children.find((c) => c.directory == childDir);
		if (!foundChild) {
			foundChild = { pictures: [], directory: childDir };
			foundClass.children = [...foundClass.children, foundChild];
		}

		// Checking if the picture is already stored
		const foundPicture = foundChild.pictures.find(
			(p) => p.path === file.path && p.size === file.size
		);
		if (!foundPicture) foundChild.pictures = [...foundChild.pictures, file];
	});

	return uploadInstitution;
}
