import { TextField, Button, Typography, Box } from "@mui/material";
import { handleLogin, handleLoginChange, loginData } from "./components/handleData";



export function Login() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" mt={3} width="100%">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label="Senha"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}
