import { ArrowBackIosNew, EastRounded } from '@mui/icons-material'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import colors from '../../constants/colors'
import { useTranslation } from 'react-i18next'

const HeaderPage = (props) => {
  const { title, enableButtonNext = false, onSwitchToCustomerHandbook, onSubmit, actionButton, setIsChecked = () => { }, removeMessageError = () => { } } = props
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleNextPage = () => {
    onSwitchToCustomerHandbook()
  }

  const handlePreviousPage = () => {
    navigate(-1)
    setIsChecked(false)
    removeMessageError()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '0 !important',
        backgroundColor: '#F5F7FE',
        border: '1px solid #EFF0F6'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '0px 16px !important',
          bgcolor: colors.lightlavendergrayColor,
          minHeight: '48px !important'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              bgcolor: colors.colorBtnBack,
              color: colors.lightroyalblueColor,
              mr: 1,
              minWidth: '30px',
              borderRadius: '8px'
            }}
            onClick={() => handlePreviousPage()}
          >
            <ArrowBackIosNew sx={{ fontSize: 16 }} />
          </Button>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 16,
              color: colors.lightroyalblueColor
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          {actionButton}
          {enableButtonNext && (
            <Button
              variant="contained"
              className="modalButtonClick"
              onClick={() => handleNextPage()}
              endIcon={<EastRounded />}
            >
              {t('continue')}
            </Button>
          )}
        </Box>
      </Toolbar>
    </Box>
  )
}

export default HeaderPage
