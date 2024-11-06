import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

function PublicLayout() {
    return (
        <>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </>
    )
}

export default PublicLayout;