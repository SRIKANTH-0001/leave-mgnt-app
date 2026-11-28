import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateLeaveDays } from '../data'
import { useLeaves } from '../context/LeaveContext'
import LeaveForm from '../components/LeaveForm'

const Apply = () => {
    const navigate = useNavigate()
    const { leaves, applyLeave } = useLeaves()
    const [formData, setFormData] = useState({
        type: 'Casual',
        from: '',
        to: '',
        reason: '',
    })
    const [formError, setFormError] = useState('')

    const onFormChange = (event) => {
        const { name, value } = event.target
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
        setFormError('')
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const reason = formData.reason.trim()
        if (!formData.from || !formData.to || !reason) {
            setFormError('Please complete all fields before applying.')
            return
        }

        if (formData.to < formData.from) {
            setFormError('The To date must be on or after the From date.')
            return
        }

        const newLeave = {
            id: Math.max(0, ...leaves.map((leave) => Number(leave.id))) + 1,
            type: formData.type,
            from: formData.from,
            to: formData.to,
            days: calculateLeaveDays(formData.from, formData.to),
            reason,
            status: 'Pending',
        }

        try {
            await applyLeave(newLeave)
            setFormError('')
            setFormData({
                type: 'Casual',
                from: '',
                to: '',
                reason: '',
            })
            navigate('/history')
        } catch (error) {
            setFormError(`Failed to add leave: ${error.message}`)
        }
    }

    return (
        <LeaveForm
            formData={formData}
            formError={formError}
            onFormChange={onFormChange}
            handleFormSubmit={handleFormSubmit}
        />
    )
}

export default Apply
