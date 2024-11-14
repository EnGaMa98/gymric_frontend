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
import {DateCalendar} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useState} from "react";
import * as ExerciseRingsService from "../../api/services/ExerciseRingsService.js";

function ExerciseRingEditDialog({open, setOpen, onChange}) {

    const currentDate = dayjs();

    const [loading, setLoading] = useState(false);

    const [exerciseProgress, setExerciseProgress] = useState(null);

    const handleOnClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setLoading(true);
        ExerciseRingsService.create({
            move_progress: 10,
            exercise_progress: exerciseProgress,
            stand_progress: 10,
            date: currentDate,
        }).then((response) => {
            console.log(response);
            setLoading(false);
            onChange();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth={true} maxWidth="lg">
            <DialogTitle>
                <Typography variant="body1">
                    Crear nuevo anillo de ejercicio
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container flexDirection="column" item xs={12} md={6}>
                    <Typography variant="h3">Sección izquierda</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                Selecciona una fecha
                            </Typography>
                            <DateCalendar defaultValue={currentDate}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container flexDirection="column" item xs={12} md={6}>
                    <Typography variant="h3">Sección derecha</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                Introduce los datos del anillo:
                            </Typography>
                            <FormControl>
                                <TextField
                                    label="Calorias"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
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
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Guardar
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSave} disabled={loading}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExerciseRingEditDialog;