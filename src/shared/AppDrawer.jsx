import {Button, Drawer} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

    return (
        <Drawer
            variant="permanent"
            open={true}
        >
            {
                buttons.map((button, index) => (
                      <Button key={index} onClick={() => handleOnClick(button.path)}>
                          {button.label}
                      </Button>
                ))
            }
        </Drawer>
    )
}

export default AppDrawer;