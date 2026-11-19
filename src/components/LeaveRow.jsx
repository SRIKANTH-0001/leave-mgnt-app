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
        <td className="leave-type">{leave.type}</td>
        <td>{formatDate(leave.from)}</td>
        <td>{formatDate(leave.to)}</td>
        <td className="days-cell">{leave.days}</td>
        <td className="optional-column">{leave.reason}</td>
        <td className="optional-column"><StatusBadge status={leave.status} /></td>
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
