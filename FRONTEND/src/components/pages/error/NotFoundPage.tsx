import { Box, Typography } from "@mui/material";

import React from "react";

export default function NotFoundPage() {
	return (
		<Box my={12}>
			<Typography variant="h1" my={2}>
				Ajjaj...
			</Typography>
			<Typography>Ez az oldal nem létezik</Typography>
		</Box>
	);
}
