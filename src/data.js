export const leaveTypes = [
    { id: "casual", type: "Casual", label: "Casual leave", total: 11, color: "purple" },
    { id: "sick", type: "Sick", label: "Sick leave", total: 8, color: "teal" },
    { id: "earned", type: "Earned", label: "Earned leave", total: 12, color: "green" },
]

export const calculateLeaveDays = (from, to) => {
    const fromDate=new Date(from);
    const toDate=new Date(to);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return daysDiff;
}

export const initialLeaveHistory = [
    { id: 1, type: "Casual", from: "2026-11-04", to: "2026-11-07", days: calculateLeaveDays("2026-11-04", "2026-11-07"), reason: "Family function", status: "Approved" },
    { id: 2, type: "Sick", from: "2026-10-20", to: "2026-10-20", days: calculateLeaveDays("2026-10-20", "2026-10-20"), reason: "Fever", status: "Approved" },
    { id: 3, type: "Earned", from: "2026-12-25", to: "2026-12-31", days: calculateLeaveDays("2026-12-25", "2026-12-31"), reason: "Year-end trip", status: "Pending" },
    { id: 4, type: "Casual", from: "2026-10-02", to: "2026-10-02", days: calculateLeaveDays("2026-10-02", "2026-10-02"), reason: "Personal work", status: "Rejected" },
    { id: 5, type: "Sick", from: "2026-09-12", to: "2026-09-13", days: calculateLeaveDays("2026-09-12", "2026-09-13"), reason: "Doctor visit", status: "Approved" },
    { id: 6, type: "Casual", from: "2026-08-18", to: "2026-08-18", days: calculateLeaveDays("2026-08-18", "2026-08-18"), reason: "Bank work", status: "Approved" },
]


