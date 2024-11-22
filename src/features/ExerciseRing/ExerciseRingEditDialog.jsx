import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, Card, CardContent, Grid, Typography } from '@mui/material';
import * as ExerciseRingsService from '../../api/services/ExerciseRingsService';

function ExerciseRingEditDialog({open, setOpen, onChange, exerciseRing}) {
    const [loading, setLoading] = useState(false);
    const [moveProgress, setMoveProgress] = useState(null);
    const [exerciseProgress, setExerciseProgress] = useState(null);
    const [standProgress, setStandProgress] = useState(null);

    useEffect(() => {
        setMoveProgress(exerciseRing?.fields.value.move ?? '');
        setExerciseProgress(exerciseRing?.fields.value.exercise ?? '');
        setStandProgress(exerciseRing?.fields.value.stand ?? '');
    }, [exerciseRing]);

    const handleOnClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await ExerciseRingsService.save(exerciseRing?.id, {
                move_progress: moveProgress,
                exercise_progress: exerciseProgress,
                stand_progress: standProgress,
                date: exerciseRing?.fields.date,
            });
            onChange();
            handleOnClose();
        } catch (error) {
            console.error("Error al editar el anillo de ejercicio", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth={true} maxWidth="lg">
            <DialogTitle>
                <Typography variant="body1">
                    Edita anillo de ejercicio
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Introduce los datos del anillo:</Typography>
                        <Card>
                            <CardContent>
                                <FormControl>
                                    <TextField
                                        label="Calorías"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={moveProgress}
                                        onChange={(event) => setMoveProgress(event.target.value)}
                                    />
                                    <TextField
                                        label="Tiempo de ejercicio"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={exerciseProgress}
                                        onChange={(event) => setExerciseProgress(event.target.value)}
                                    />
                                    <TextField
                                        label="Tiempo de pie"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={standProgress}
                                        onChange={(event) => setStandProgress(event.target.value)}
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

export default ExerciseRingEditDialog;