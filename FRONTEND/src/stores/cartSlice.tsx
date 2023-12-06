import { AppState } from "./useBoundStore";
import { StateCreator } from "zustand";

export interface CartSlice {
	count: number;
	addToCart: () => void;
}

export const createCartSlice: StateCreator<AppState, [], [], CartSlice> = (set) => ({
	count: 1,
	addToCart: () => {
		set((state) => ({ count: state.count + 1 }));
	},
});
