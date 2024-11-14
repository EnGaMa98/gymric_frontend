import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {

    return (
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppRoutes/>
            </LocalizationProvider>
        </BrowserRouter>
    )
}

export default App
