import {Grid, Typography} from "@mui/material";
import ExerciseRingList from "../ExerciseRing/ExerciseRingList.jsx";

function ProfileView() {
    return (
        <Grid container flexDirection="column" item xs={12}>
            <Typography variant="h3">
                Mi perfil
            </Typography>
            <Typography variant="body1">
                Alex Bonilla
            </Typography>
            <ExerciseRingList/>
        </Grid>
    )
}

export default ProfileView;