import "./App.css"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import { useLeaves } from "./context/LeaveContext"
import Home from "./pages/Home"
import History from "./pages/History"
import Apply from "./pages/Apply"
import LeaveDetail from "./pages/LeaveDetail"
import NotFound from "./pages/NotFound"

function App() {
  const {
    loading,
    error,
  } = useLeaves()

  if (loading) {
    return (
      <>
        <Header />
        <main className="page-content">Loading...</main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="page-content">Error: {error}</main>
      </>
    )
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/history" element={<History />} />
        <Route path="/leave/:id" element={<LeaveDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
