import BalanceCard from '../components/BalanceCard'
import StatusBadge from '../components/StatusBadge';

const Home = ({ balances, leaveHistory }) => {
    const recentLeaves = leaveHistory.slice(0, 3);
    return (
        <main className="page-content">
            <BalanceCard balances={balances} />
            <section className="leave-history panel home-recent">
                <h2>Recent leaves</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Days</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLeaves.map((recentLeave) => (
                                <tr key={recentLeave.id}>
                                    <td>{recentLeave.type}</td>
                                    <td>{recentLeave.from}</td>
                                    <td>{recentLeave.to}</td>
                                    <td>{recentLeave.days}</td>
                                    <td><StatusBadge status={recentLeave.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Home