import {Button, Drawer, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as AuthService from "../api/services/AuthService.js";
function AppDrawer() {
    const navigate = useNavigate();

    const buttons = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Mi perfil',
            path: '/profile',
        },
        {
            label: 'Goals',
            path: '/goals',
        }
    ];

    const handleOnClick = (path) => {
        navigate(path);
    }

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error("Error cerrando sesion", error);
        }
    }

    return (
        <Drawer
            variant="permanent"
            open={true}
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                <Box display="flex" flexDirection="column">
                    {
                        buttons.map((button, index) => (
                            <Button key={index} onClick={() => handleOnClick(button.path)}>
                                {button.label}
                            </Button>
                        ))
                    }
                </Box>
                <Box>
                    <Button onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}

export default AppDrawer;