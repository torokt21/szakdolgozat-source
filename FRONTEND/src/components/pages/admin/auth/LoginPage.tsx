import { Avatar, Box, Button, Card, Container, InputAdornment, Typography } from "@mui/material";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";

import { AccountCircle } from "@mui/icons-material";
import { Form } from "react-final-form";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import { LoginRequestDto } from "../../../../utils/Dtos/LoginDto";
import { TextField } from "mui-rff";
import { green } from "@mui/material/colors";
import { useBoundStore } from "../../../../stores/useBoundStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const login = useBoundStore((s) => s.login);

	const navigate = useNavigate();
	const isLoggedIn = useBoundStore((s) => s.isLoggedIn());

	if (isLoggedIn) navigate("/admin");

	function handleLogin(values: LoginRequestDto) {
		axios
			.post("https://localhost:44370/api/Auth", values)
			.then((result) => {
				login(result.data);
			})
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response?.status === 401)
					setErrorMessage("Hibás felhasználónév vagy jelszó!");
				else setErrorMessage("Váratlan hiba. Próbálkozz újra később!");
			});
	}

	return (
		<Container maxWidth="xs">
			<Box mt={16}>
				<Card>
					<Box p={3} textAlign="center">
						<Box mt={2} mb={1} style={{ justifyContent: "center", display: "flex" }}>
							<Avatar sx={{ bgcolor: green[500] }}>
								<LockIcon />
							</Avatar>
						</Box>
						<Typography variant="h3" component="h1" mb={5}>
							Bejelentkezés
						</Typography>
						{errorMessage && <Typography color="red">{errorMessage}</Typography>}
						<Form
							onSubmit={handleLogin}
							render={({ handleSubmit }) => (
								<>
									<Box my={2}>
										<TextField
											name="Username"
											label="Felhasználónév"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle />
													</InputAdornment>
												),
											}}
										/>
									</Box>

									<Box my={2}>
										<TextField
											name="Password"
											label="Jelszó"
											type="password"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<KeyIcon />
													</InputAdornment>
												),
											}}
										/>
									</Box>

									<Button
										fullWidth={true}
										variant="contained"
										color="primary"
										type="submit"
										onClick={handleSubmit}>
										Bejelentkezés
									</Button>
								</>
							)}
						/>
					</Box>
				</Card>
			</Box>
		</Container>
	);
}
