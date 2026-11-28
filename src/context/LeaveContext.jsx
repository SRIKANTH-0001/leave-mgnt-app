import { createContext, useContext, useEffect, useState } from "react";
import { getLeaves, getLeaveTypes,addLeave, deleteLeave,updateLeaveStatus} from "../api";

export const LeaveContext = createContext(null);

export function LeaveProvider({ children }) {
    const [leaves, setLeaves] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const loadData = async () => {
            try {
               const [leavesData,leaveTypesData] = await Promise.all([getLeaves(), getLeaveTypes()]);
               leavesData.sort((a,b)=>Number(b.id)-Number(a.id));
               setLeaves(leavesData);
               setLeaveTypes(leaveTypesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const applyLeave=async(newLeave)=>{
        setError("");
        try {
           const addedLeave=await addLeave(newLeave);
           setLeaves(previousLeaves=>[addedLeave,...previousLeaves]);
           return addedLeave;
       } catch (error) {
            setError(error.message);
            throw error;
       }
       
    }

    const cancelLeave=async(id)=>{
        setError("");
        try{
            await deleteLeave(id);
            setLeaves(prevLeaves=>
                prevLeaves.filter(leave=>String(leave.id)!==String(id)));
            return true;
        }catch(error){
            setError(error.message);
            throw error;
        }
    }

    const reviewLeave = async (id, status) => {
        setError("");
        try {
            const updatedLeave = await updateLeaveStatus(id, status);
            setLeaves((previousLeaves) =>
                previousLeaves.map((leave) =>
                    String(leave.id) === String(id) ? updatedLeave : leave
                )
            );
            return updatedLeave;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const approveLeave = (id) => reviewLeave(id, "Approved");
    const rejectLeave = (id) => reviewLeave(id, "Rejected");

    return(
        <LeaveContext.Provider value={{
            leaves,
            leaveTypes,
            loading,
            error,
            applyLeave,
            cancelLeave,
            approveLeave,
            rejectLeave,
        }}>
            {children}
        </LeaveContext.Provider>
    )
}

export function useLeaves(){
    const context=useContext(LeaveContext);

    if(context===null){
        throw new Error("useLeaves must be used inside LeaveProvider")
    }

    return context;
}



