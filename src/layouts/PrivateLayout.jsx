import AppDrawer from "../shared/AppDrawer.jsx";
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

function PrivateLayout() {
    return (
        <>
            <AppDrawer/>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </>
    )
}

export default PrivateLayout;