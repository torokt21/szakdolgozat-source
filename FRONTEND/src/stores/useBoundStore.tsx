import { AuthSlice, createAuthSlice } from "./authSlice";
import { CartSlice, createCartSlice } from "./cartSlice";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppState = AuthSlice & CartSlice;

export const useBoundStore = create<AppState>()(
	persist(
		(...a) => ({
			...createCartSlice(...a),
			...createAuthSlice(...a),
		}),
		{ name: "bound-store" }
	)
);
