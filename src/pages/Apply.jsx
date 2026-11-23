import React from 'react'
import LeaveForm from '../components/LeaveForm'

const Apply = ({formData,formError,onFormChange,handleFormSubmit}) => {
  return (
    <>
        <p style={{marginTop:"18px"}}></p>
        <LeaveForm
            formData={formData}
            formError={formError}
            onFormChange={onFormChange}
            handleFormSubmit={handleFormSubmit}
        />
    </>
  )
}

export default Apply