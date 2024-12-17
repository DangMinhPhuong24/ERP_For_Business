import React, { useState, useEffect } from 'react'
import '../../resource/style/loginStyle.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../../redux/auth/auth.actions'
import '../../resource/style/common.css'
import {
  authErrorSelector,
  authTokenSelector,
  authUserSelector
} from '../../redux/auth/auth.selectors'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/Buttons/LanguageSwitcher'
import { InputAdornment, TextField, IconButton,} from '@mui/material'
import colors from '../../constants/colors'
import { useUser } from 'contexts/AuthContext'
import { deleteCookie, getCookie } from 'utils'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(<VisibilityIcon />)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameErrorMessage, setUserNameErrorMessage] = useState([])
  const [passwordErrorMessage, setPasswordErrorMessage] = useState([])
  const [errorMessage, setErrorMessage] = useState([])
  const dispatch = useDispatch()
  const { handleSubmit } = useForm()
  const authToken = useSelector(authTokenSelector)
  const authError = useSelector(authErrorSelector)
  const authUser = useSelector(authUserSelector)
  const { setUserInfo } = useUser()
  const token = getCookie('token')
  const handleToggle = () => {
    setType(type === 'password' ? 'text' : 'password')
    setIcon(type === 'password' ? <VisibilityOffIcon /> : <VisibilityIcon />)
  }

  useEffect(() => {
    if (authUser) {
      setUserInfo(authUser)
    }
  }, [authUser, setUserInfo])

  const onSubmit = () => {
    const data = {
      userName: name,
      password: password
    }
    dispatch(loginAction(data))
  }

  useEffect(() => {
    if (authError) {
      setUserNameErrorMessage(authError.username || '')
      setPasswordErrorMessage(authError.password || '')
      if(!authError.username && !authError.password ){
        setErrorMessage(authError || '')
      }
    } else {
      setErrorMessage('')
      setUserNameErrorMessage('')
      setPasswordErrorMessage('')
    }
  }, [authToken, navigate, authError])

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime')
    if (token) {
      const currentTime = Date.now()
      if (currentTime > parseInt(expirationTime)) {
        deleteCookie('token')
        localStorage.removeItem('expirationTime')
      } else {
        navigate('/home')
      }
    }
  }, [token])

  return (
    <div className="auth-wrapper">
      <div className="w-1/3 flex items-center justify-center auth-inner">
        <div className="upper-section">
          <img style={{ marginTop: '60px' }} src="/image/logo-linhhieu.png" alt={t('image') + ' Logo '} />
          <h1>{t('login')}</h1>
          <LanguageSwitcher />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>{t('username')}</label>
            <TextField
              className="input-wrapper"
              error={userNameErrorMessage || errorMessage ? true : false}
              id={userNameErrorMessage ? 'outlined-error-helper-text' : 'outlined-required'}
              helperText={userNameErrorMessage || errorMessage ? userNameErrorMessage || errorMessage : ''}
              placeholder="example@gmail.com"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                sx: {
                  background: colors.paleGrayColor
                }
              }}
            />
          </div>
          <div className="mb-3">
            <label>{t('password')}</label>
            <TextField
              className="input-wrapper"
              error={!!passwordErrorMessage}
              id="outlined-password-input"
              helperText={passwordErrorMessage}
              value={password}
              type={type}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: {
                  background: colors.paleGrayColor
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggle} edge="end">
                      {icon}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {t('login')}
            </button>
          </div>
        </form>
        <div className="image-wrapper">
          <div className="slide">
            <img src="/image/image-pg.png" alt={t('image')} />
          </div>
        </div>
        <div className="footer">
          <p>© Powered By DEHA VIETNAM</p>
        </div>
      </div>
      <div className="relative w-2/3 h-full flex items-center justify-center bg">
        <div className="slide">
          <img src="/image/image-pg.png" alt={t('image')} />
        </div>
      </div>
    </div>
  )
}
