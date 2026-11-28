import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLeaves } from '../context/LeaveContext'
import StatusBadge from '../components/StatusBadge';
import './LeaveDetail.css';


const LeaveDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { leaves, loading, error, cancelLeave } = useLeaves()
    const [cancelError, setCancelError] = useState("");
    const leave = leaves.find((item) => String(item.id) === String(id));

    const handleCancel = async () => {
        setCancelError("");
        try {
            await cancelLeave(leave.id);
            navigate("/history");
        } catch (error) {
            setCancelError(`Could not cancel the leave: ${error.message}`);
        }
    };


    if (loading) return <p>Loading leave...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!leave) return <p>Leave with given id is not found</p>;

    return (
        <main className="page-content">
            <section className="leave-detail panel">
                <header className="leave-detail__header">
                    <div>
                        <p className="leave-detail__eyebrow">Leave request #{leave.id}</p>
                        <h1>{leave.type} leave</h1>
                    </div>
                    <StatusBadge status={leave.status} />
                </header>
                <div className="leave-detail__grid">
                    <div className="leave-detail__item">
                        <span>From</span>
                        <strong>{leave.from}</strong>
                    </div>
                    <div className="leave-detail__item">
                        <span>To</span>
                        <strong>{leave.to}</strong>
                    </div>
                    <div className="leave-detail__item">
                        <span>Number of days</span>
                        <strong>{leave.days}</strong>
                    </div>
                </div>
                <div className="leave-detail__reason">
                    <h2>Reason</h2>
                    <p>{leave.reason}</p>
                </div>
                {leave.status === "Pending" && (
                    <div className="leave-detail__actions">
                        {cancelError && <p role="alert">{cancelError}</p>}
                        <button
                            className="cancel-button"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel leave
                        </button>
                    </div>
                )}
            </section>
        </main>
    )
}

export default LeaveDetail