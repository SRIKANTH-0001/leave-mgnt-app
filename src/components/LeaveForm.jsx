import "./LeaveForm.css"

const LeaveForm = () => (
    <form className="leave-form panel">
        <h2 className="form-title">Apply leave</h2>
        <div className="form-field">
            <label className="form-label" htmlFor="leave-type">Leave type</label>
            <select className="form-control" id="leave-type" defaultValue="Casual leave">
                <option>Casual leave</option>
                <option>Sick leave</option>
                <option>Earned leave</option>
            </select>
        </div>
        <div className="date-fields">
            <div className="form-field">
                <label className="form-label" htmlFor="leave-from">From</label>
                <input className="form-control" id="leave-from" type="date" defaultValue="2026-11-24" />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="leave-to">To</label>
                <input className="form-control" id="leave-to" type="date" defaultValue="2026-11-25" />
            </div>
        </div>
        <div className="form-field">
            <label className="form-label" htmlFor="leave-reason">Reason</label>
            <textarea className="form-control reason-control" id="leave-reason" placeholder="Enter reason" />
        </div>
        <button className="form-button" type="button">Apply Leave</button>
    </form>
)

export default LeaveForm
