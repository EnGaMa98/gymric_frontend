import {Button, Card, CardContent, CircularProgress, Grid, Typography, LinearProgress} from "@mui/material";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import * as ExerciseRingsService from "../../api/services/ExerciseRingsService.js";
import ExerciseRingCreateDialog from "./ExerciseRingCreateDialog.jsx";
import ExerciseRingEditDialog from "./ExerciseRingEditDialog.jsx";

function ExerciseRingList() {

    const [loading, setLoading] = useState(false);
    const [exerciseRings, setExerciseRings] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedExerciseRing, setSelectedExerciseRing] = useState(null);

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
    const handleRefresh = () => {
        get();
    };

    const handleCreate = () => {
        setOpenCreateDialog(true);
        setSelectedExerciseRing(null);
    };

    const handleEdit = (exerciseRing) => {
        setSelectedExerciseRing(exerciseRing);
        setOpenEditDialog(true);
    };
    
    const handleDelete = async (id) => {
        setLoading(true);
        try{
            await ExerciseRingsService.destroy({ id });
            get();
        } catch (error) {
            console.log(error);
        } finally {     
            setLoading(false);
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Anillos de ejercicio</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="end">
                    <Button onClick={handleRefresh} disabled={loading}>
                        Recargar datos
                    </Button>
                    <Button variant="contained" onClick={handleCreate} disabled={loading}>
                        Crear nuevo anillo
                    </Button>
                </Grid>
                {loading && (
                    <Grid container item xs={12} justifyContent="center" sx={{ py: 10 }}>
                        <CircularProgress />
                    </Grid>
                )}
                {!loading &&
                    exerciseRings?.map((exerciseRing) => (
                        <Grid item xs={12} key={exerciseRing.id}>
                            <Card sx={{ my: 1 }}>
                                <CardContent>
                                    <Grid container alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body1">
                                                Fecha: {format(new Date(exerciseRing.fields.date), 'dd/MM/yyyy')}
                                            </Typography>
                                            <Typography variant="body1">
                                                Calorías: {exerciseRing.fields.move_progress} / {exerciseRing.fields.move_goal}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(exerciseRing.fields.move_progress / exerciseRing.fields.move_goal) * 100}
                                            />
                                            <Typography variant="body1">
                                                Tiempo de ejercicio: {exerciseRing.fields.exercise_progress} / {exerciseRing.fields.exercise_goal}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(exerciseRing.fields.exercise_progress / exerciseRing.fields.exercise_goal) * 100}
                                            />
                                            <Typography variant="body1">
                                                Tiempo de pie: {exerciseRing.fields.stand_progress} / {exerciseRing.fields.stand_goal}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(exerciseRing.fields.stand_progress / exerciseRing.fields.stand_goal) * 100}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} container justifyContent="flex-end">
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(exerciseRing.id)}>
                                                Editar
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(exerciseRing.id)}>
                                                Eliminar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <ExerciseRingCreateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} onChange={get} />
            {selectedExerciseRing && (
                <ExerciseRingEditDialog
                    open={openEditDialog}
                    setOpen={setOpenEditDialog}
                    onChange={get}
                    exerciseRing={selectedExerciseRing}
                />
            )}
        </>
    );
}

export default ExerciseRingList;