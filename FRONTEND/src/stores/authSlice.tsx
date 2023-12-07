import { JwtPayload, jwtDecode } from "jwt-decode";

import { AppState } from "./useBoundStore";
import { LoginResponseDto } from "../utils/Dtos/LoginDto";
import { StateCreator } from "zustand";

export interface AuthSlice {
	user?: {
		authToken: string;
		username: string;
		id: string;
		displayname: string;
		expires: number;
		roles: string[];
	};
	login: (loginResponse: LoginResponseDto) => void;
	logout: () => void;
	isLoggedIn: () => boolean;
}

export const createAuthSlice: StateCreator<AppState, [], [], AuthSlice> = (set, get) => ({
	user: undefined,

	login: (loginResponse: LoginResponseDto) => {
		set(() => {
			const decodedJwt = jwtDecode(loginResponse.token) as JwtPayload &
				Record<string, string | number | string[]>;
			console.log("decoded:", decodedJwt);

			return {
				user: {
					authToken: loginResponse.token as string,
					username: decodedJwt.nameid as string,
					id: decodedJwt.sub as string,
					displayname: decodedJwt.displayname as string,
					expires: decodedJwt.exp as number,
					roles:
						typeof decodedJwt.role === "string"
							? [decodedJwt.role]
							: (decodedJwt.role as string[]),
				},
			};
		});
	},
	isLoggedIn: () => !!get().user,
	logout: () => set(() => ({ user: undefined })),
});
