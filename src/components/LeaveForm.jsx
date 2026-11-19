import "./LeaveForm.css"

const LeaveForm = ({ formData, formError, onFormChange, handleFormSubmit }) => (

    <form className="leave-form panel" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Apply leave</h2>
        <div className="form-field">
            <label className="form-label" htmlFor="leave-type">Leave type</label>
            <select className="form-control" id="leave-type" name="type" value={formData.type} onChange={onFormChange}>
                <option value="Casual">Casual leave</option>
                <option value="Sick">Sick leave</option>
                <option value="Earned">Earned leave</option>
            </select>
        </div>
        <div className="date-fields">
            <div className="form-field">
                <label className="form-label" htmlFor="leave-from">From</label>
                <input className="form-control" id="leave-from" type="date" name="from" value={formData.from} onChange={onFormChange} required />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="leave-to">To</label>
                <input className="form-control" id="leave-to" type="date" name="to" value={formData.to} onChange={onFormChange} required />
            </div>
        </div>
        <div className="form-field">
            <label className="form-label" htmlFor="leave-reason">Reason</label>
            <textarea className="form-control reason-control" id="leave-reason" name="reason" placeholder="Enter reason" value={formData.reason} onChange={onFormChange} required />
        </div>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button className="form-button" type="submit">
            Apply Leave
        </button>
    </form>
)

export default LeaveForm
