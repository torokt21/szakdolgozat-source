import { Avatar, Box, Button, Card, Container, InputAdornment, Typography } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { Form } from "react-final-form";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";
import { TextField } from "mui-rff";
import { green } from "@mui/material/colors";

type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
	function handleSubmit() {}

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
						<Form
							onSubmit={() => handleSubmit()}
							render={({ handleSubmit, values }) => (
								<>
									<Box my={2}>
										<TextField
											name="username"
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
											name="password"
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
