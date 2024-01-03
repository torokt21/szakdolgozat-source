import "dayjs/locale/hu";

import { Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminLayout from "./components/layouts/AdminLayout";
import CreateInstitutionPage from "./components/pages/admin/institution/CreateInstitutionPage";
import { CssBaseline } from "@mui/material";
import DashboardPage from "./components/pages/admin/DashboardPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./components/pages/user/home/HomePage";
import ListInstitutions from "./components/pages/admin/institution/ListInstitutionsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import LoginPage from "./components/pages/admin/auth/LoginPage";
import NotFoundPage from "./components/pages/error/NotFoundPage";
import React from "react";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { setLocale as setYupLocale } from "yup";
import translations from "./utils/yup-locale";

function App() {
	setYupLocale(translations);
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hu">
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="admin">
						<Route path="login" element={<LoginPage />} />
						<Route element={<AdminLayout />}>
							<Route index element={<DashboardPage />} />
							<Route path="institution">
								<Route index element={<ListInstitutions />} />
								<Route path="new" element={<CreateInstitutionPage />} />
							</Route>
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Route>
					<Route element={<DefaultLayout />}>
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
