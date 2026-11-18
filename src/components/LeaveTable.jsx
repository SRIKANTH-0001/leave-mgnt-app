import "./LeaveTable.css"
import LeaveRow from "./LeaveRow"

const LeaveTable = ({ leaveHistory }) => (
    <section className="leave-history panel">
        <h2>Leave history</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {leaveHistory.map((leave) => (
                        <LeaveRow key={leave.id} leave={leave} />
                    ))}
                </tbody>
            </table>
        </div>
    </section>
)

export default LeaveTable
