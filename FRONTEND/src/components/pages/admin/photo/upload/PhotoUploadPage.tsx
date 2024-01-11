import { Box, Collapse, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Child from "../../../../../utils/types/Child";
import Institution from "../../../../../utils/types/Institution";
import InstitutionSelect from "./InstitutionSelect";
import { UploadClass } from "../../../../../utils/types/UploadClass";
import UploadDropZone from "./UploadDropZone";
import UploadFileBrowser from "./UploadFileBrowser";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";
import _ from "lodash";
import { useAxiosClient } from "../../../../../utils/hooks/useAxiosClient";

export default function PhotoUploadPage() {
	const [uploadInstitution, setUploadInstitution] = useState<UploadInstitution>();

	const [institution, setInstitution] = useState<Institution | undefined>();
	const [selectedChildFullPath, setSelectedChildFullPath] = useState<string>();

	function findChildByFullPath(path?: string) {
		if (path)
			return uploadInstitution?.classes
				.flatMap((c) => c.Children)
				.find((c) => c.fullPath === path);
	}

	useEffect(() => {
		if (!institution) return;
		setUploadInstitution({
			institution: institution,
			classes: [],
			fullPath: "",
		});
	}, [institution?.Id]);

	function handleFilesChanged(uploadInstitution: UploadInstitution) {
		setUploadInstitution(uploadInstitution);
	}

	function handleUpload() {
		if (!uploadInstitution) return;
		UploadInstitutionFiles(uploadInstitution).then((failedInstitution) => {
			setUploadInstitution(failedInstitution);
			//alert("Feltöltés kész");
		});
	}

	return (
		<>
			<Collapse in={!institution}>
				<InstitutionSelect onSubmit={setInstitution} />;
			</Collapse>
			<Collapse in={!!institution}>
				<Paper>
					<Box p={3}>
						<Typography component="h1" variant="h4">
							Képek feltöltése - {institution?.Name}
						</Typography>
						<Box py={3}>
							{uploadInstitution && (
								<UploadDropZone
									uploadInstitution={uploadInstitution}
									onFilesChanged={setUploadInstitution}
								/>
							)}
						</Box>

						{uploadInstitution && (
							<UploadFileBrowser
								selectedChild={findChildByFullPath(selectedChildFullPath)}
								uploadInstitution={uploadInstitution}
								onSelectionChange={setSelectedChildFullPath}
								onFilesChanged={handleFilesChanged}
								onUploadClick={handleUpload}
							/>
						)}
					</Box>
				</Paper>
			</Collapse>
		</>
	);
}

async function UploadInstitutionFiles(institution: UploadInstitution) {
	const clone = _.cloneDeep(institution);
	for (const clas of institution.classes) {
		const instResponse = await useAxiosClient().post(
			process.env.REACT_APP_API_URL + "UploadClass",
			JSON.stringify({
				DirectoryName: clas.Directory,
				InstitutionId: institution.institution.Id,
			})
		);

		if (!instResponse || instResponse.status !== 200) continue;

		const classResult = instResponse.data as Required<UploadClass>;

		for (const child of clas.Children) {
			const childResponse = await useAxiosClient().post(
				process.env.REACT_APP_API_URL + "Child",
				JSON.stringify({
					DirectoryName: child.directory,
					UploadClassId: classResult.Id,
				})
			);

			if (!childResponse || childResponse.status !== 200) continue;

			const childResult = childResponse.data as Child;
			const form = new FormData();
			form.append("ChildId", childResult.Id.toString());

			child.pictures.forEach((pic) => {
				form.append("Pictures", pic, pic.name);
			});

			const uploadResult = await useAxiosClient("multipart/form-data").postForm(
				process.env.REACT_APP_API_URL + "Picture",
				form
			);

			if (!uploadResult || uploadResult.status !== 200) continue;

			clas.Children = clas.Children.filter((c) => c.fullPath != child.fullPath);
		}
		if (clas.Children.length == 0)
			clone.classes = clone.classes.filter((c) => c.FullPath !== clas.FullPath);
	}

	return clone;
}
