import { Box, Collapse, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import Institution from "../../../../../utils/types/Institution";
import InstitutionSelect from "./InstitutionSelect";
import UploadDropZone from "./UploadDropZone";
import UploadFileBrowser from "./UploadFileBrowser";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";

export default function PhotoUploadPage() {
	const [uploadInstitution, setUploadInstitution] = useState<UploadInstitution>();

	const [institution, setInstitution] = useState<Institution | undefined>();
	const [selectedChildFullPath, setSelectedChildFullPath] = useState<string>();

	function findChildByFullPath(path?: string) {
		if (path)
			return uploadInstitution?.classes
				.flatMap((c) => c.children)
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

	return (
		<Paper>
			<Box p={3}>
				<InstitutionSelect selected={institution} onSelectionChange={setInstitution} />
				<Collapse in={!!institution}>
					<Box py={3}>
						{uploadInstitution && (
							<UploadDropZone
								uploadInstitution={uploadInstitution}
								onFilesChanged={setUploadInstitution}
							/>
						)}
					</Box>
				</Collapse>

				{uploadInstitution && (
					<UploadFileBrowser
						selectedChild={findChildByFullPath(selectedChildFullPath)}
						uploadInstitution={uploadInstitution}
						onSelectionChange={setSelectedChildFullPath}
						onFilesChanged={handleFilesChanged}
					/>
				)}
			</Box>
		</Paper>
	);
}
