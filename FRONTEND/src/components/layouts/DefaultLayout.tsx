import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import React from "react";

export default function DefaultLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}
