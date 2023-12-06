import { AppState } from "./useBoundStore";
import { StateCreator } from "zustand";

export interface AuthSlice {
	token: string;
	login: () => void;
}

export const createAuthSlice: StateCreator<AppState, [], [], AuthSlice> = (set) => ({
	token: "",
	login: () => {
		set((state) => ({ token: state.token + "" }));
	},
});
