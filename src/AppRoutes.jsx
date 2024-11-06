import {Route, Routes} from "react-router-dom";
import HomeView from "./features/Home/HomeView.jsx";
import ProfileView from "./features/User/ProfileView.jsx";
import PrivateLayout from "./layouts/PrivateLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import LoginView from "./features/User/LoginView.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout/>}>
                <Route path="/login" element={<LoginView/>}/>
            </Route>

            <Route element={<PrivateLayout/>}>
                <Route path="/" element={<HomeView/>}/>
                <Route path="/profile" element={<ProfileView/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes;