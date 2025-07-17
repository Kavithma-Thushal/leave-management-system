import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/pages/Home';
import Register from './views/pages/Register';
import Login from './views/pages/Login';
import AdminDashboard from './views/pages/AdminDashboard';
import EmployeeDashboard from './views/pages/EmployeeDashboard';
import {Navbar} from "./views/components/Navbar/Navbar.tsx";
import {Footer} from "./views/components/Footer/Footer.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}