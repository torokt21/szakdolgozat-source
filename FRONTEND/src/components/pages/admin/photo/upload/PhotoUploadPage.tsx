import { Box, Collapse, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import Institution from "../../../../../utils/types/Institution";
import InstitutionSelect from "./InstitutionSelect";
import UploadDropZone from "./UploadDropZone";
import { UploadInstitution } from "../../../../../utils/types/UploadInstitution";

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
						{uploadInstitution && (
							<UploadDropZone
								uploadInstitution={uploadInstitution}
								onFilesChanged={setUploadInstitution}
							/>
						)}
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
}
