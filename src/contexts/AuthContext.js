import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  userInfo: {},
  setUserInfo: (value) => {}
})

export const useUser = () => {
  return useContext(AuthContext)
}
