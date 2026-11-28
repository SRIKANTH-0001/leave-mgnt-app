export function useLeaveBalance(leaves, leaveTypes) {
    const approvedLeaves = leaves.filter((leave) => leave.status === "Approved");
    const totalTakenDays = approvedLeaves.reduce((sum, leave) => sum + leave.days, 0);

    const balances = leaveTypes.map((leaveType) => {
        const approvedDays = approvedLeaves
            .filter((leave) => leave.type === leaveType.name)
            .reduce((sum, leave) => sum + leave.days, 0);
        const daysLeft = leaveType.total - approvedDays;

        return {
            id: leaveType.id,
            label: `${leaveType.name} leave`,
            color: { casual: "purple", sick: "teal", earned: "green" }[leaveType.id],
            total: leaveType.total,
            approvedDays,
            daysLeft,
            value: daysLeft,
            detail: `left of ${leaveType.total}`,
            progress: Math.max(0, Math.min(100, (daysLeft / leaveType.total) * 100)),
        };
    });

    balances.push({
        id: "taken",
        label: "Taken this year",
        value: totalTakenDays,
        detail: "days approved",
        progress: Math.min(100, (totalTakenDays / 30) * 100),
        color: "orange",
    });

    return { balances, totalTakenDays };
}