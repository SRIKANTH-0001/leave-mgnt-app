import { useState } from 'react'
import LeaveTable from '../components/LeaveTable'
import { useSearchParams } from 'react-router-dom'
import { useLeaves } from '../context/LeaveContext'

const History = () => {
    const { leaves, cancelLeave, approveLeave, rejectLeave } = useLeaves()
    const [searchParams, setSearchParams] = useSearchParams()
    const [actionError, setActionError] = useState('')
    const statusFilter = searchParams.get('status');
    const filteredLeaveHistory = statusFilter ? leaves.filter(leave => leave.status === statusFilter) : leaves;

    const onFilterChange = (status) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if(status === 'All'){
            newSearchParams.delete('status');
        } else {
            newSearchParams.set('status', status);
        }
        setSearchParams(newSearchParams);
    };

    const handleCancel = async (id) => {
        setActionError('')
        try {
            const cancelled = await cancelLeave(id)
            if (cancelled) {
                setSearchParams({})
            }
        } catch (error) {
            setActionError(error.message)
        }
    };

    const handleReview = async (id, status) => {
        setActionError('')
        try {
            if (status === 'Approved') {
                await approveLeave(id)
            } else if (status === 'Rejected') {
                await rejectLeave(id)
            }
        } catch (error) {
            setActionError(error.message)
        }
    };

    const activeFilter = statusFilter || 'All';

  return (
    <main className="page-content">
      {actionError && <p className="form-error" role="alert">{actionError}</p>}
      <LeaveTable
        leaveHistory={filteredLeaveHistory}
        onCancel={handleCancel}
        onReview={handleReview}
        onFilterChange={onFilterChange}
        activeFilter={activeFilter}
      />
    </main>
  )
}

export default History