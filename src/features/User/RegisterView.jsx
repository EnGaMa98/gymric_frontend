import {Grid, Typography, FormControl, TextField, Button, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
function RegisterView() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };
    return (
        <Grid container flexDirection="column" item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">
                    Registro
                </Typography>
                <Button variant="outlined" onClick={handleLoginRedirect}>
                    Ya estoy registrado
                </Button>
            </Box>
            <FormControl>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
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
                <TextField
                    label="Confirma tu contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Altura"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Peso"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Registrar
                </Button>
            </FormControl>  
        </Grid>
    )
}

export default RegisterView;