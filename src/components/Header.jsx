import "./Header.css"

const Header = () => {
    return (
        <header className="navbar">
            <a className="nav-brand" href="/" aria-label="LeaveDesk home">
                <span className="brand-mark" aria-hidden="true">L</span>
                <span className="brand-name">LeaveDesk</span>
            </a>
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