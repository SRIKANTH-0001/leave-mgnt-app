import { useState, useEffect } from "react"
import "./App.css"
import BalanceCard from "./components/BalanceCard"
import Header from "./components/Header"
import LeaveForm from "./components/LeaveForm"
import LeaveTable from "./components/LeaveTable"
import { calculateLeaveDays } from "./data"
import { getLeaves, getLeaveTypes, addLeave,deleteLeave,updateLeaveStatus } from "./api"

function App() {

  const [data, setData] = useState({ leaveTypes: [], leaveHistory: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    type: "Casual",
    from: "",
    to: "",
    reason: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveTypesData, leavesData] = await Promise.all([
          getLeaveTypes(),
          getLeaves(),
        ]);
        setData({ leaveTypes: leaveTypesData, leaveHistory: leavesData });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  const { leaveTypes, leaveHistory } = data;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormError("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const reason = formData.reason.trim();

    if (!formData.from || !formData.to || !reason) {
      setFormError("Please complete all fields before applying.");
      return;
    }

    if (formData.to < formData.from) {
      setFormError("The To date must be on or after the From date.");
      return;
    }

    const newLeave = {
      id: crypto.randomUUID(),
      type: formData.type,
      from: formData.from,
      to: formData.to,
      days: calculateLeaveDays(formData.from, formData.to),
      reason,
      status: "Pending",
    };

    try {
      const addedLeave = await addLeave(newLeave);
      setFormError("");
      setData((prevData) => ({
        ...prevData,
        leaveHistory: [addedLeave, ...prevData.leaveHistory],
      }));
      setFormData({
        type: "Casual",
        from: "",
        to: "",
        reason: "",
      });

    } catch (error) {
      setFormError("Failed to add leave: " + error.message);
    }

  };

  // const handleCancelLeave = (id) => {
  //   setLeaveHistory((prevHistory) =>
  //     prevHistory.filter((leave) => leave.id !== id || leave.status !== "Pending")
  //   );
  // };

  const handleCancelLeave = async(id)=>{
    try {
      await deleteLeave(id);
      setData((prevData) => ({
        ...prevData,
        leaveHistory: prevData.leaveHistory.filter((leave) => leave.id !== id),
      }));

    } catch (error) {
      setFormError("Failed to cancel leave: " + error.message);
    }
  }

  // const handleReviewLeave = (id, status) => {
  //   setLeaveHistory((prevHistory) =>
  //     prevHistory.map((leave) =>
  //       leave.id === id && leave.status === "Pending"
  //         ? { ...leave, status }
  //         : leave
  //     )
  //   );
  // };

  const handleReviewLeave=async (id,status)=>{
    try {
      const updatedLeave=await updateLeaveStatus(id,status);
      setData((prevData) => ({
        ...prevData,
        leaveHistory: prevData.leaveHistory.map((leave) =>
          leave.id === id ? updatedLeave : leave
        ),
      }));

    } catch (error) {
      setFormError("Failed to update leave status: " + error.message);
    }
  }

  const filteredLeaveHistory = activeFilter === "All"
    ? leaveHistory
    : leaveHistory.filter((leave) => leave.status === activeFilter);

  const approvedLeaves = leaveHistory.filter((leave) => leave.status === "Approved");

  const takenDays = approvedLeaves.reduce((total, leave) => total + leave.days, 0);

  const leaveBalances = [
    ...leaveTypes.map((leaveType) => {
      const approvedDays = approvedLeaves
        .filter((leave) => leave.type === leaveType.name)
        .reduce((total, leave) => total + leave.days, 0);
      const daysLeft = leaveType.total - approvedDays;

      return {
        ...leaveType,
        label: `${leaveType.name} leave`,
        color: { casual: "purple", sick: "teal", earned: "green" }[leaveType.id],
        value: daysLeft,
        detail: `left of ${leaveType.total}`,
        progress: Math.max(0, Math.min(100, (daysLeft / leaveType.total) * 100)),
      };
    }),
    {
      id: "taken",
      label: "Taken this year",
      value: takenDays,
      detail: "days approved",
      progress: Math.min(100, (takenDays / 30) * 100),
      color: "orange",
    },
  ];

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
          <LeaveForm
            formData={formData}
            formError={formError}
            onFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
          <LeaveTable
            leaveHistory={filteredLeaveHistory}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onCancel={handleCancelLeave}
            onReview={handleReviewLeave}
          />
        </section>
      </main>
    </div>
  )
}

export default App
