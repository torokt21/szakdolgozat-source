import { Container } from "@mui/material";
import React from "react";
import useInstitutions from "../../../../utils/hooks/useInstitutions";

export default function ListInstitutions() {
	const [institutions, loading, error] = useInstitutions();
	console.log(institutions);

	return <Container></Container>;
}
