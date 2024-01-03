import { Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout";
import { CssBaseline } from "@mui/material";
import DashboardPage from "./components/pages/admin/DashboardPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./components/pages/user/home/HomePage";
import ListInstitutions from "./components/pages/admin/institution/ListInstitutionsPage";
import LoginPage from "./components/pages/admin/auth/LoginPage";
import NotFoundPage from "./components/pages/error/NotFoundPage";
import React from "react";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { setLocale } from "yup";
import translations from "./utils/yup-locale";

function App() {
	setLocale(translations);
	return (
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="admin">
					<Route path="login" element={<LoginPage />} />
					<Route element={<AdminLayout />}>
						<Route index element={<DashboardPage />} />
						<Route path="institution" element={<ListInstitutions />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Route>
				<Route element={<DefaultLayout />}>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
