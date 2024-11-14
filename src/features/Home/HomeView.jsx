import {Button, Card, CardContent, Grid, Typography, FormControl, TextField} from "@mui/material";
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
function HomeView() {
    const currentDate = dayjs();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container>
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
            </Grid>
        </LocalizationProvider>
    )
}

export default HomeView;