import LeaveTable from '../components/LeaveTable'
import { useSearchParams } from 'react-router-dom'

const History = ({leaveHistory,onCancel,onReview}) => {

    const [searchParams,setSearchParams] = useSearchParams();
    const statusFilter = searchParams.get('status');
    const filteredLeaveHistory = statusFilter ? leaveHistory.filter(leave => leave.status === statusFilter) : leaveHistory;

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
        const cancelled = await onCancel(id);
        if (cancelled) {
            setSearchParams({});
        }
    };

    const activeFilter = statusFilter || 'All';

  return (
    <main className="page-content">
      <LeaveTable leaveHistory={filteredLeaveHistory} onCancel={handleCancel} onReview={onReview} onFilterChange={onFilterChange} activeFilter={activeFilter} />
    </main>
  )
}

export default History