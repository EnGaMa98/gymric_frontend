import {Grid, Typography, FormControl} from "@mui/material";

function ProfileView() {
    return (
        <Grid container flexDirection="column" item xs={12}>
            <Typography variant="h3">
                Mi perfil
            </Typography>
            <Typography variant="body1">
                Alex Bonilla
            </Typography>
        </Grid>
    )
}

export default ProfileView;