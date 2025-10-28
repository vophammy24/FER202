import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

export default function DashboardLayout() {
    return (
        <div className="layout">
            <aside className="sidebar">
                <NavLink to="/dashboard">Home</NavLink>
                <NavLink to="/dashboard/settings">Settings</NavLink>
                <NavLink to="/dashboard/reports">Reports</NavLink>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}