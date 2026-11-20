export const getLeaves = async () => {
    try {
        const response = await fetch('http://localhost:3001/leaves');

        if (!response.ok) {
            throw new Error(`Loading Leaves Failed ${response.status}`);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        throw new Error("Could not load leaves: " + error.message)
    }
}

export const getLeaveTypes = async () => {
    try {
        const response = await fetch('http://localhost:3001/leaveTypes');

        if (!response.ok) {
            throw new Error(`Loading Leave Types Failed ${response.status}`);
        } else {
            const data = await response.json();
            return data;
        }
    }
    catch (error) {
        throw new Error("Could not load leave types: " + error.message)
    }
}

export const addLeave = async (leave) => {

    try {
        const response = await fetch('http://localhost:3001/leaves', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leave)
        });

        if (!response.ok) {
            throw new Error(`Failed to Add leaves. Request exits with code ${response.status}`);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        throw new Error("Could not add leave: " + error.message);
    }

}

export const deleteLeave =async (leaveId) => {
    try {
        const response =await fetch(`http://localhost:3001/leaves/${leaveId}`,{
            method: 'DELETE',
        });
        if(!response.ok){
            throw new Error(`Failed to delete leave. Request exits with code ${response.status}`);
        }
    }catch(error){
        throw new Error("Could not delete leave:"+error.message);
    }  
}

export const updateLeaveStatus=async(leaveId,status)=>{
    try {
        const response=await fetch(`http://localhost:3001/leaves/${leaveId}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status})
        })

        if(!response.ok){
            throw new Error(`Could not update the Leave status. Request exits with status code ${response.status}`);
        }else{
            const data=await response.json();
            return data;
        }
    } catch (error) {
        throw new Error("Could not Update the Leave! "+error.message);
    }
}
