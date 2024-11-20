import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import * as ExerciseRingsService from "../../api/services/ExerciseRingsService.js";

function ExerciseRingCreateDialog({ open, setOpen, onChange }) {
    const [loading, setLoading] = useState(false);
    const [moveProgress, setMoveProgress] = useState(null);
    const [exerciseProgress, setExerciseProgress] = useState(null);
    const [standProgress, setStandProgress] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleOnClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setLoading(true);
        ExerciseRingsService.create({
            move_progress: moveProgress,
            exercise_progress: exerciseProgress,
            stand_progress: standProgress,
            date: selectedDate.format('YYYY-MM-DD'),
        }).then((response) => {
            console.log(response);
            setLoading(false);
            onChange();
            handleOnClose();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth={true} maxWidth="lg">
            <DialogTitle>
                <Typography variant="body1">
                    Crear nuevo anillo de ejercicio
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3">Selecciona una fecha</Typography>
                        <Card>
                            <CardContent>
                                <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
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

export default ExerciseRingCreateDialog;