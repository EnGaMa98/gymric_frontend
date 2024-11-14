import {Grid, Typography, FormControl, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
function LoginView() {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/register');
    };
    return (
        <Grid container flexDirection="column" item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">
                    Login
                </Typography>
                <Button variant="outlined" onClick={handleRegisterRedirect}>
                    Quiero registrarme
                </Button>
            </Box>
            <FormControl>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Iniciar sesión
                </Button>
            </FormControl>  
        </Grid>
    )
}

export default LoginView;