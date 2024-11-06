import {Container, Grid, Typography} from "@mui/material";

function ProfileView() {
    return (
        <Container>
            <Grid container flexDirection="column" item xs={12}>
                <Typography variant="h3">
                    Mi perfil
                </Typography>
                <Typography variant="body1">
                    Alex Bonilla
                </Typography>
            </Grid>
        </Container>
    )
}

export default ProfileView;