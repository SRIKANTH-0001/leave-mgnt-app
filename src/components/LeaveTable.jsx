import "./LeaveTable.css"
import LeaveRow from "./LeaveRow"

const filters = ["All", "Approved", "Pending", "Rejected"]

const LeaveTable = ({ leaveHistory, activeFilter, onFilterChange, onCancel, onReview }) => (
    <section className="leave-history panel">
        <h2>Leave history</h2>
        <div className="leave-filters" role="group" aria-label="Filter leave history">
            {filters.map((filter) => (
                <button
                    className={`filter-button${activeFilter === filter ? " filter-button--active" : ""}`}
                    type="button"
                    key={filter}
                    aria-pressed={activeFilter === filter}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Days</th>
                        <th className="optional-column" scope="col">Reason</th>
                        <th className="optional-column" scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveHistory.length > 0 ? (
                        leaveHistory.map((leave) => (
                            <LeaveRow
                                key={leave.id}
                                leave={leave}
                                onCancel={onCancel}
                                onReview={onReview}
                            />
                        ))
                    ) : (
                        <tr>
                            <td className="empty-state" colSpan="7">No leaves found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </section>
)

export default LeaveTable
