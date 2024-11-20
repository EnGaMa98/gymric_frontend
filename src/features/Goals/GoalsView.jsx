import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import GoalsCreateDialog from './GoalsCreateDialog';
import * as GoalsService from "../../api/services/GoalsService.js";

function GoalsView() {
    const [loading, setLoading] = useState(false);
    const [goals, setGoals] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const get = async () => {
        setLoading(true);
        try {
            const response = await GoalsService.list();
            setGoals(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const handleCreate = () => {
        setOpenCreateDialog(true);
        get();
    };

    const handleRefresh = () => {
        get();
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Goals</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="end">
                    <Button onClick={handleRefresh} disabled={loading}>
                        Recargar datos
                    </Button>
                    <Button variant="contained" onClick={handleCreate} disabled={loading}>
                        Nuevo Goal
                    </Button>
                </Grid>
                {loading && (
                    <Grid container item xs={12} justifyContent="center" sx={{ py: 10 }}>
                        <CircularProgress />
                    </Grid>
                )}
                {!loading && goals?.map((goal) => (
                    <Grid item xs={12} key={goal.id}>
                        <Card sx={{ my: 1 }}>
                            <CardContent>
                                <Typography variant="body1">
                                    Move Goal: {goal.fields.move_goal}
                                </Typography>
                                <Typography variant="body1">
                                    Exercise Goal: {goal.fields.exercise_goal}
                                </Typography>
                                <Typography variant="body1">
                                    Stand Goal: {goal.fields.stand_goal}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <GoalsCreateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} onChange={get} />
        </>
    );
}

export default GoalsView;