import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import ExerciseRingEditDialog from './ExerciseRingEditDialog';
import ExerciseRingListItemProperty from './ExerciseRingListItemProperty';
import * as ExerciseRingsService from '../../api/services/ExerciseRingsService.js';

function ExerciseRingList() {
    const [exerciseRings, setExerciseRings] = useState(null);
    const [exerciseRing, setExerciseRing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false); 

    const get = async () => {
        setLoading(true);
        try {
            const response = await ExerciseRingsService.list();
            console.log("Exercise rings:", response.data); 
            setExerciseRings(response.data);
        } catch (error) {
            console.error("Error fetching exercise rings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const handleCreate = () => {
        setExerciseRing(null);
        setIsCreateMode(true); 
        setOpenEditDialog(true);
    };

    const handleEdit = (exerciseRing) => {
        setExerciseRing(exerciseRing);
        setIsCreateMode(false); 
        setOpenEditDialog(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await ExerciseRingsService.destroy({ id });
            get();
        } catch (error) {
            console.error("Error deleting exercise ring:", error);
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
                    <Button onClick={get} disabled={loading}>
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
                {!loading && exerciseRings?.map((exerciseRing) => (
                    <Grid item xs={12} key={exerciseRing.id}>
                        <Card sx={{ my: 1 }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1">
                                            Fecha: {format(new Date(exerciseRing.fields.date), 'dd/MM/yyyy')}
                                        </Typography>
                                        <ExerciseRingListItemProperty exerciseRing={exerciseRing} property={'move'} label={'Calorías'} />
                                        <ExerciseRingListItemProperty exerciseRing={exerciseRing} property={'exercise'} label={'Ejercicio'} />
                                        <ExerciseRingListItemProperty exerciseRing={exerciseRing} property={'stand'} label={'Tiempo de pie'} />
                                    </Grid>
                                    <Grid item xs={12} md={6} container justifyContent="flex-end">
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(exerciseRing)}>
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
            <ExerciseRingEditDialog
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                onChange={get}
                exerciseRing={exerciseRing}
                isCreateMode={isCreateMode} 
            />
        </>
    );
}

export default ExerciseRingList;