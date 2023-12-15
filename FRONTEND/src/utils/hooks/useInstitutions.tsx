import { useEffect, useState } from "react";

import { useAxiosClient } from "./useAxiosClient";

const useInstitutions = () => {
	const [institutions, setInstitutions] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		useAxiosClient()
			.get(process.env.REACT_APP_API_URL + "Institution")
			.then((result) => setInstitutions(result.data))
			.catch((error) => setError(true))
			.finally(() => setLoading(false));
	}, []);

	return [institutions, loading, error];
};

export default useInstitutions;
