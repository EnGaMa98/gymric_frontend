import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography, Card, CardContent, FormControl } from '@mui/material';
import * as GoalsService from "../../api/services/GoalsService.js";

function GoalsCreateDialog({ open, setOpen, onChange }) {
    const [loading, setLoading] = useState(false);
    const [moveGoal, setMoveGoal] = useState('');
    const [exerciseGoal, setExerciseGoal] = useState('');
    const [standGoal, setStandGoal] = useState('');

    const handleOnClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await GoalsService.create({
                move_goal: moveGoal,
                exercise_goal: exerciseGoal,
                stand_goal: standGoal,
            });
            onChange();
            handleOnClose();
        } catch (error) {
            console.error("Error creando el goal", error);
            handleOnClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth={true} maxWidth="lg">
            <DialogTitle>
                <Typography variant="body1">
                    Crear nuevo Goal
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Detalles:</Typography>
                        <Card>
                            <CardContent>
                                <FormControl>
                                    <TextField
                                        label="Move Goal"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={moveGoal}
                                        onChange={(event) => setMoveGoal(event.target.value)}
                                    />
                                    <TextField
                                        label="Exercise Goal"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={exerciseGoal}
                                        onChange={(event) => setExerciseGoal(event.target.value)}
                                    />
                                    <TextField
                                        label="Stand Goal"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={standGoal}
                                        onChange={(event) => setStandGoal(event.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        Guardar
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSave} disabled={loading}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default GoalsCreateDialog;