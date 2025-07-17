import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}