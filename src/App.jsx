import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import { calculateLeaveDays } from "./data"
import { getLeaves, getLeaveTypes, addLeave, deleteLeave, updateLeaveStatus } from "./api"

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Apply from "./pages/Apply";
import LeaveDetail from "./pages/LeaveDetail";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate();

  const [data, setData] = useState({ leaveTypes: [], leaveHistory: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setData({
          leaveTypes: leaveTypesData,
          leaveHistory: [...leavesData].sort((a, b) => Number(b.id) - Number(a.id)),
        });
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
    return (
      <>
        <Header />
        <main className="page-content">Loading...</main>
      </>
    );
  } else if (error) {
    return (
      <>
        <Header />
        <main className="page-content">Error: {error}</main>
      </>
    );
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
      id: Math.max(0, ...data.leaveHistory.map((leave) => Number(leave.id))) + 1,
      type: formData.type,
      from: formData.from,
      to: formData.to,
      days: calculateLeaveDays(formData.from, formData.to),
      reason,
      status: "Pending",
    };

    try {
      const addedLeave = await addLeave(newLeave);
      navigate("/history");
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

  const handleCancelLeave = async (id) => {
    try {
      await deleteLeave(id);
      setData((prevData) => ({
        ...prevData,
        leaveHistory: prevData.leaveHistory.filter((leave) => leave.id !== id),
      }));
      return true;

    } catch (error) {
      setFormError("Failed to cancel leave: " + error.message);
      return false;
    }
  }


  const handleReviewLeave = async (id, status) => {
    try {
      const updatedLeave = await updateLeaveStatus(id, status);
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
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home balances={leaveBalances} leaveHistory={leaveHistory} />} />
        <Route path="/apply" element={<Apply formData={formData}
          formError={formError}
          onFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit} />}
        />
        <Route path="/history" element={<History leaveHistory={leaveHistory} onCancel={handleCancelLeave} onReview={handleReviewLeave} />} />
        <Route path="/leave/:id" element={<LeaveDetail onCancel={handleCancelLeave}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
