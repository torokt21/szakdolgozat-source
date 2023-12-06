import { Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./components/pages/user/home/HomePage";
import LoginPage from "./components/pages/admin/auth/LoginPage";
import NotFoundPage from "./components/pages/error/NotFoundPage";
import React from "react";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<Routes>
				<Route>
					<Route path="login" element={<LoginPage />} />
				</Route>
				<Route element={<DefaultLayout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
