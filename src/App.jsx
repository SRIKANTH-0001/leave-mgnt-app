import "./App.css"
import BalanceCard from "./components/BalanceCard"
import Header from "./components/Header"
import LeaveForm from "./components/LeaveForm"
import LeaveTable from "./components/LeaveTable"
import { leaveBalances, leaveHistory } from "./data"

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <section className="page-intro">
          <h1>My leaves</h1>
          <p>Year 2026 · Leave balance and history</p>
        </section>
        <BalanceCard balances={leaveBalances} />
        <section className="leave-workspace" aria-label="Leave requests">
          <LeaveForm />
          <LeaveTable leaveHistory={leaveHistory} />
        </section>
      </main>
    </div>
  )
}

export default App
