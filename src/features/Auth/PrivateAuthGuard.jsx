import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function PrivateAuthGuard() {
    const navigate = useNavigate();

    const hasToken = !!localStorage.getItem('token');

    useEffect(() => {
        if (!hasToken) {
            navigate('/login');
        }
    }, []);

    if (hasToken) {
        return (
            <Outlet/>
        )
    }
}
export default PrivateAuthGuard;