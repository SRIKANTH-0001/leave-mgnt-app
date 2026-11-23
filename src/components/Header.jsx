import { NavLink } from "react-router-dom"
import "./Header.css"

const Header = () => {
    return (
        <header className="navbar">
            <NavLink className="nav-brand" to="/" end>
                <span className="brand-mark" aria-hidden="true">L</span>
                <span className="brand-name">LeaveDesk</span>
            </NavLink>
            <nav className="nav-links">
                <NavLink to="/apply" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                    Apply
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                    History
                </NavLink>
            </nav>
            <div className="nav-right">
                <div className="profile">
                    <span className="profile-name">SRIKANTH K</span>
                    <span className="profile-role">Software Trainee</span>
                </div>
                <div className="profile-icon" aria-label="Srikanth K">SK</div>
            </div>
        </header>
    )
}

export default Header