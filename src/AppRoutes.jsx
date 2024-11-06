import {Route, Routes} from "react-router-dom";
import HomeView from "./features/Home/HomeView.jsx";
import ProfileView from "./features/User/ProfileView.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeView/>}/>
            <Route path="/profile" element={<ProfileView/>}/>
        </Routes>
    )
}

export default AppRoutes;