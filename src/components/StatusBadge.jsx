import "./StatusBadge.css"

const StatusBadge = ({ status }) => (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
        {status}
    </span>
)

export default StatusBadge
