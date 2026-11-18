import "./LeaveRow.css"
import StatusBadge from "./StatusBadge"

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const LeaveRow = ({ leave }) => (
    <tr>
        <td className="leave-type">{leave.type}</td>
        <td>{formatDate(leave.from)}</td>
        <td>{formatDate(leave.to)}</td>
        <td className="days-cell">{leave.days}</td>
        <td className="optional-column">{leave.reason}</td>
        <td className="optional-column"><StatusBadge status={leave.status} /></td>
    </tr>
)

export default LeaveRow
