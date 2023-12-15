import axios from "axios";
import { useBoundStore } from "../../stores/useBoundStore";

export function useAxiosClient() {
	const client = axios.create();
	const token = useBoundStore.getState().user?.authToken;

	client.interceptors.request.use(
		(config) => {
			if (token) {
				config.headers.Authorization = "Bearer " + token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return client;
}
