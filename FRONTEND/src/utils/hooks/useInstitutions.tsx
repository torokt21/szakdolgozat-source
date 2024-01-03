import { useEffect, useState } from "react";

import { InstitutionDto } from "../dtos/InstitutionDto";
import dayjs from "dayjs";
import { useAxiosClient } from "./useAxiosClient";

export type Institution = {
	id: number;
	name: string;
	shortcode: string;
	contactInfo: string;
	photographerId: string;
	softDeadline: dayjs.Dayjs;
	hardDeadline: dayjs.Dayjs;
	expectedShippingStart: dayjs.Dayjs;
	expectedShippingEnd: dayjs.Dayjs;
	displayMessage: string;
};

const useInstitutions = (reloader: number = 0) => {
	const [institutions, setInstitutions] = useState<Institution[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);
		useAxiosClient()
			.get(process.env.REACT_APP_API_URL + "Institution")
			.then((result) => {
				const res = result.data as InstitutionDto[];
				setInstitutions(
					res.map((r) => {
						return {
							id: r.id,
							name: r.name,
							shortcode: r.shortcode,
							contactInfo: r.contactInfo,
							photographerId: r.photographerId,
							softDeadline: dayjs(r.softDeadline),
							hardDeadline: dayjs(r.hardDeadline),
							expectedShippingStart: dayjs(r.expectedShippingStart),
							expectedShippingEnd: dayjs(r.expectedShippingEnd),
							displayMessage: r.displayMessage,
						} as Institution;
					})
				);
			})
			.catch(() => {
				setError(true);
			})
			.finally(() => setLoading(false));
	}, [reloader]);

	return [institutions, loading, error] as const;
};

export default useInstitutions;
