import { Grid, Typography, FormControl, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as AuthService from "../../api/services/AuthService.js";

function RegisterView() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        gender: '',
        height: '',
        weight: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        if (formData.password !== formData.passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }
        try {
            await AuthService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation, 
                gender: formData.gender,
                height: formData.height,
                weight: formData.weight,
            });
            const loginData = {
                email: formData.email,
                password: formData.password
            };
            const response = await AuthService.login(loginData);
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (error) {
            console.error("Error de registro de usuario", error);
        } finally {
            setLoading(false);
        }
    };

    const disabled = !formData.name || !formData.email || !formData.password || !formData.passwordConfirmation || !formData.gender || !formData.height || !formData.weight || loading || localStorage.getItem('token');
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
            <FormControl component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    label="Confirmar Contraseña"
                    name="passwordConfirmation"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                />
                <TextField
                    label="Género"
                    name="gender"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.gender}
                    onChange={handleChange}
                />
                <TextField
                    label="Altura"
                    name="height"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.height}
                    onChange={handleChange}
                />
                <TextField
                    label="Peso"
                    name="weight"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.weight}
                    onChange={handleChange}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={disabled}
                >
                    Registrarse
                </Button>
            </FormControl>
        </Grid>
    );
}

export default RegisterView;