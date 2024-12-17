// @ts-nocheck
import React, { useCallback, useState } from 'react'
import CreateCustomer from '../CreateCustomer'
import CreateCustomerHandbook from '../CreateCustomerHandbook'
import { useDispatch } from 'react-redux'
import { createCustomerPreviewAction } from '../../../../redux/customer/customer.actions'

const MainCreateCustomer = () => {
  const dispatch = useDispatch()

  const [showCustomerHandbook, setShowCustomerHandbook] = useState(false)
  const [createCustomers, setCreateCustomers] = useState('')

  const handleSwitchToCustomerHandbook = () => {
    setShowCustomerHandbook(!showCustomerHandbook)
  }

  const createCustomer = useCallback((value) => {
    dispatch(createCustomerPreviewAction(value))
    setCreateCustomers(value)
  })

  return (
    <>
      {!showCustomerHandbook && (
        <CreateCustomer
          dataBack={createCustomers}
          onSubmit={createCustomer}
          onSwitchToCustomerHandbook={handleSwitchToCustomerHandbook}
        />
      )}
      {showCustomerHandbook && (
        <CreateCustomerHandbook createCustomers={createCustomers} onSwitchToCustomer={handleSwitchToCustomerHandbook} />
      )}
    </>
  )
}

export default MainCreateCustomer
