import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Button, TextField, Menu, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import * as UsersService from "../../api/services/UsersService.js";

function ProfileView() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UsersService.get().then((response) => {
            setUser(response);
            setLoading(false);
        });
    }, []);

    const handleClick = (event, field) => {
        setAnchorEl(event.currentTarget);
        setSelectedField(field);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedField(null);
    };

    const handleChange = (event) => {
        setUser({ ...user, fields: { ...user.fields, [selectedField]: event.target.value } });
    };

    const handleSave = async () => {
        try {
            await axios.post(`/api/users/me`, { [selectedField]: user.fields[selectedField] }); 
            handleClose();
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const renderForm = () => (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem>
                <TextField
                    label={selectedField}
                    value={user && user.fields ? user.fields[selectedField] : ''}
                    onChange={handleChange}
                    fullWidth
                />
                <Button onClick={handleSave} variant="contained" color="primary">
                    Guardar
                </Button>
            </MenuItem>
        </Menu>
    );

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Grid container spacing={2} flexDirection="column" item xs={12}>
            <Typography variant="h3">
                Editar Usuario
            </Typography>
            {user && user.fields && Object.keys(user.fields).map((field) => (
                <Grid item xs={12} key={field}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="body1">
                                    {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${user.fields[field]}`}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={(event) => handleClick(event, field)}
                                >
                                    Editar
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {renderForm()}
        </Grid>
    );
}

export default ProfileView;