import {Button, Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import * as ExerciseRingsService from "../../api/services/ExerciseRingsService.js";
import ExerciseRingEditDialog from "./ExerciseRingEditDialog.jsx";

function ExerciseRingList() {

    const [loading, setLoading] = useState(false);
    const [exerciseRings, setExerciseRings] = useState(null);

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleRefresh = () => {
        get();
    }

    const handleCreate = () => {
        setOpenEditDialog(true);
    }

    const get = () => {
        if (!loading) {
            setLoading(true);
            ExerciseRingsService.list()
                .then((response) => {
                    setExerciseRings(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (!exerciseRings) {
            get();
        }
    }, []);

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h3">Anillos de ejercicio</Typography>
                <Grid container item xs={12} justifyContent="end">
                    <Button onClick={handleRefresh} disabled={loading}>
                        Recargar datos
                    </Button>
                    <Button variant="contained" onClick={handleCreate} disabled={loading}>
                        Crear nuevo anillo
                    </Button>
                </Grid>
                {
                    loading &&
                    <Grid container item xs={12} justifyContent="center" sx={{py: 10}}>
                        <CircularProgress/>
                    </Grid>
                }
                {
                    !loading && exerciseRings?.map((exerciseRing) => (
                        <Card key={exerciseRing.id} sx={{my: 1}}>
                            <CardContent>
                                <Typography variant="body1">
                                    Fecha: {format(exerciseRing.fields.date, 'dd/MM/yyyy')}
                                </Typography>
                                <Typography variant="body1">
                                    Calorías ejercicio: {exerciseRing.fields.exercise_progress}
                                </Typography>
                                <Typography variant="body1">
                                    Calorías movimiento: {exerciseRing.fields.move_progress}
                                </Typography>
                                <Typography variant="body1">
                                    Calorías de pie: {exerciseRing.fields.stand_progress}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Grid>
            <ExerciseRingEditDialog open={openEditDialog} setOpen={setOpenEditDialog} onChange={() => get()}/>
        </>
    );
}

export default ExerciseRingList;