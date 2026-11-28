import "./BalanceCard.css"
import { useLeaves } from "../context/LeaveContext"
import { useLeaveBalance } from "../hooks/useLeaveBalance"

const BalanceCard = () => {
    const { leaves, leaveTypes } = useLeaves()
    const { balances } = useLeaveBalance(leaves, leaveTypes)

    return (
        <>
            <section className="page-intro">
                <h1>My leaves</h1>
                <p>Year 2026 · Leave balance and history</p>
            </section>

            <section className="balance-card" aria-label="Leave balances">
                {balances.map((balance) => (
                    <article className={`balance-card-item balance-card-item--${balance.color}`} key={balance.id}>
                        <p className="balance-label">{balance.label}</p>
                        <strong className="balance-value">{balance.value}</strong>
                        <p className="balance-detail">{balance.detail}</p>
                        <div className="balance-progress" aria-hidden="true">
                            <span style={{ width: `${balance.progress}%` }} />
                        </div>
                    </article>
                ))}
            </section>
        </>
    )
}

export default BalanceCard