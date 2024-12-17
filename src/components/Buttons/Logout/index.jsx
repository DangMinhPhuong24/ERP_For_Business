import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../../../src/redux/auth/auth.actions'
import { useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { setSidebarWidth } from '../../../redux/app/app.slice'
import colors from '../../../constants/colors'
import { deleteCookie } from 'utils'

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    deleteCookie('token')
    dispatch(logoutAction())
    dispatch(setSidebarWidth(0))
    navigate('/login')
  }

  return (
    <button
      style={{
        width: '12px',
        height: '13px',
        color: colors.midnightBlueColor
      }}
      onClick={handleLogout}
    >
      <IoLogOut />
    </button>
  )
}

export default LogoutButton
