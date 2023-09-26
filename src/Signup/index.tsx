import { TextField, Button, Typography, Box } from "@mui/material";
import { companyData, handleCompanyChange, handleUserChange, userData } from "./components/handlechange";
import { errorMessage, handleSubmit, step } from "./components/handleSubmit";

export function Signup() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {step === 1 && (
                <>
                    <Typography component="h1" variant="h5">
                        Cadastro - Empresa
                    </Typography>
                    <Box component="form" mt={3} width="100%">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nome da empresa"
                            name="companyName"
                            value={companyData.companyName}
                            onChange={handleCompanyChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="CNPJ"
                            name="cnpj"
                            value={companyData.cnpj}
                            onChange={handleCompanyChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Segmento"
                            name="segment"
                            value={companyData.segment}
                            onChange={handleCompanyChange}
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                            Próximo
                        </Button>
                    </Box>
                </>
            )}
            {step === 2 && (
                <>
                    <Typography component="h1" variant="h5">
                        Cadastro - Usuário Admin
                    </Typography>
                    <Box component="form" mt={3} width="100%">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nome do usuário"
                            name="userName"
                            value={userData.userName}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Senha"
                            name="password"
                            value={userData.password}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Celular"
                            name="phone"
                            value={userData.phone}
                            onChange={handleUserChange}
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

