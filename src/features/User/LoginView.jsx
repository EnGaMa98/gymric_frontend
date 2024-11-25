import {Grid, Typography, FormControl, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import * as AuthService from "../../api/services/AuthService.js";
function LoginView() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false);

    const disabled = !email || !password || loading;

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    const handleOnClick = () => {
        setLoading(true);
        const data = {
            email,
            password
        };
        AuthService.login(data)
            .then((response) => {
                localStorage.setItem('token', response.token);
                navigate('/');
                setLoading(false);
            });
    }

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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={disabled}
                    onClick={handleOnClick}
                >
                    Iniciar sesión
                </Button>
            </FormControl>  
        </Grid>
    )
}

export default LoginView;