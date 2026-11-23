import { Link } from "react-router-dom"
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

const LeaveRow = ({ leave, onCancel, onReview }) => (
    <tr>
        <td className="leave-type">
            <Link className="leave-row-link" to={`/leave/${leave.id}`}>{leave.type}</Link>
        </td>
        <td><Link className="leave-row-link" to={`/leave/${leave.id}`}>{formatDate(leave.from)}</Link></td>
        <td><Link className="leave-row-link" to={`/leave/${leave.id}`}>{formatDate(leave.to)}</Link></td>
        <td className="days-cell"><Link className="leave-row-link" to={`/leave/${leave.id}`}>{leave.days}</Link></td>
        <td className="optional-column"><Link className="leave-row-link" to={`/leave/${leave.id}`}>{leave.reason}</Link></td>
        <td className="optional-column">
            <Link className="leave-row-link" to={`/leave/${leave.id}`}>
                <StatusBadge status={leave.status} />
            </Link>
        </td>
        <td>
            {leave.status === "Pending" && (
                <div className="row-actions">
                    <button className="review-button review-button--approve" type="button" onClick={() => onReview(leave.id, "Approved")}>
                        Approve
                    </button>
                    <button className="review-button review-button--reject" type="button" onClick={() => onReview(leave.id, "Rejected")}>
                        Reject
                    </button>
                    <button className="cancel-button" type="button" onClick={() => onCancel(leave.id)}>
                        Cancel
                    </button>
                </div>
            )}
        </td>
    </tr>
)

export default LeaveRow
