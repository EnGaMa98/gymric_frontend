import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, Card, CardContent, Grid, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import * as ExerciseRingsService from '../../api/services/ExerciseRingsService';

function ExerciseRingEditDialog({ open, setOpen, onChange, exerciseRing, isCreateMode }) {
    const [loading, setLoading] = useState(false);
    const [moveProgress, setMoveProgress] = useState(null);
    const [exerciseProgress, setExerciseProgress] = useState(null);
    const [standProgress, setStandProgress] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        if (exerciseRing) {
            console.log("Editing exercise ring:", exerciseRing); 
            if (exerciseRing.fields) {
                setMoveProgress(exerciseRing.fields.move_progress);
                setExerciseProgress(exerciseRing.fields.exercise_progress);
                setStandProgress(exerciseRing.fields.stand_progress);
                setSelectedDate(dayjs(exerciseRing.fields.date));
            } else {
                console.error("Exercise ring fields are undefined:", exerciseRing);
            }
        }
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
                date: isCreateMode ? selectedDate.toDate() : new Date(exerciseRing?.fields.date),
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
                    {isCreateMode ? "Crear nuevo anillo de ejercicio" : "Editar anillo de ejercicio"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {isCreateMode && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Selecciona una fecha</Typography>
                            <Card>
                                <CardContent>
                                    <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(dayjs(newValue))} />
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    <Grid item xs={12} md={isCreateMode ? 6 : 12}>
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