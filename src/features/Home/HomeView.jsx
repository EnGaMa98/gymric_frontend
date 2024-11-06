import {Button, Card, CardContent, Container, Grid, Typography} from "@mui/material";

function HomeView() {
    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid container flexDirection="column" item xs={12} md={6}>
                    <Typography variant="h3">Sección izquierda</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                Título
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button variant="text">
                        Aquí el botón
                    </Button>
                </Grid>
                <Grid container flexDirection="column" item xs={12} md={6}>
                    <Typography variant="h3">Sección derecha</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                Título
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button variant="text">
                        Aquí el botón
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomeView;