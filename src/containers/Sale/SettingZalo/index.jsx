import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import HeaderPage from 'components/HeaderPage'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WarningIcon from '../../../asset/icon/WarningFilled.svg'
import colors from '../../../constants/colors'

export default function SettingZalo() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    const appId = process.env.REACT_APP_ZALO_APP_ID
    const redirectUri = encodeURIComponent(process.env.REACT_APP_ZALO_REDIRECT_URI)
    const url = `${process.env.REACT_APP_ZALO_API_CODE}?app_id=${appId}&redirect_uri=${redirectUri}`
    window.location.href = url
  }

  return (
    <>
      <HeaderPage title={t('SettingZaloOA')} />
      <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="form"
          sx={{
            bgcolor: colors.lilywhiteColor,
            borderRadius: '10px',
            padding: '20px',
            position: 'relative',
            width: 'fit-content'
          }}
        >
          <Box sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <WarningIcon width={30} height={30} fill={colors.goldenrodColor} />
          </Box>
          <Box sx={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>
            <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: '20px', fontWeight: 500 }}>
              {t('YouHaveNotLoggedInToYourZaloOaAccount')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <Button className="modalButtonClick" sx={{ gap: '8px', fontSize: 14, fontWeight: 500 }} onClick={handleLogin}>
            {t('logInNow')}
            <FaArrowRightLong />
          </Button>
        </Box>
      </Box>
    </>
  )
}
