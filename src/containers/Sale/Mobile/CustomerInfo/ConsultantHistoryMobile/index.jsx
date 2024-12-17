// @ts-nocheck
import { useState } from 'react'
import { Box, Button, Typography, Toolbar } from '@mui/material'
import colors from '../../../../../constants/colors'
import { useNavigate, useLocation } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import React from 'react'
import { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PaginationComponent from 'components/Paginate'
import titleTableListConsultingHistoriesMobile from 'constants/titleTableListConsultingHistoriesMobile'
import ConsultHistoryMobileTable from 'components/Table/CustomerTable/ConsultHistoryMobileTable'
import {
  getListConsultationHistoriesAction,
  deleteConsultationHistoryAction
} from '../../../../../redux/customer/customer.actions'
import {
  listConsultationHistoriesState,
  totalPagesState,
  deleteConsultationHistorySuccessFlagState
} from '../../../../../redux/customer/customer.selectors'

const ConsultantHistoryMobilePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [resetCurrentPage, setResetCurrentPage] = useState(false)
  const listConsultationHistories = useSelector(listConsultationHistoriesState)
  const deleteConsultationHistorySuccessFlag = useSelector(deleteConsultationHistorySuccessFlagState)
  const totalPages = useSelector(totalPagesState)
  const customerId = new URLSearchParams(location.search).get('customer_id')

  useEffect(() => {
    setStartIndex(0)
    setResetCurrentPage(true)
    dispatch(getListConsultationHistoriesAction({ customer_id: customerId }))
  }, [dispatch])

  useEffect(() => {
    if (resetCurrentPage) {
      setResetCurrentPage(!resetCurrentPage)
    }
  }, [resetCurrentPage])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setStartIndex((page - 1) * 10)
    dispatch(getListConsultationHistoriesAction({ customer_id: customerId, page: page })).then(() => setLoading(false))
  }

  const handleCreateConsultantHistory = () => {
    navigate(`/sale/information/consultant-history/create?customer_id=${customerId}`)
  }

  const handleBackPage = () => {
    navigate(`/sale/information/customer-detail?id=${customerId}`)
  }

  const handleDeleteConsultantHistory = useCallback(
    (id, customerHandBookId) => {
      dispatch(
        deleteConsultationHistoryAction({ id: id, customer_id: customerId, customer_handbook_id: customerHandBookId })
      )
    },
    [dispatch]
  )

  useEffect(() => {
    if (deleteConsultationHistorySuccessFlag) {
      setStartIndex(0)
      setResetCurrentPage(true)
      dispatch(getListConsultationHistoriesAction({ customer_id: customerId }))
    }
  }, [deleteConsultationHistorySuccessFlag, dispatch])

  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '8px 16px !important',
          bgcolor: colors.lightlavendergrayColor,
          minHeight: '48px !important',
          border: '1px solid #EFF0F6 !important'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              bgcolor: colors.whiteColor,
              color: colors.lightroyalblueColor,
              mr: 1,
              minWidth: '30px',
              borderRadius: '8px'
            }}
            onClick={() => handleBackPage()}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </Button>
          <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
            {t('btnConsultant')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button className="modalButtonClick" sx={{ gap: '8px' }} onClick={handleCreateConsultantHistory}>
            <AddCircleOutlineIcon />
            {t('addConsultation')}
          </Button>
        </Box>
      </Toolbar>
      <Box p={2} component="form" sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <Typography sx={{ fontWeight: '500', fontSize: '20px', color: colors.indigoColor }}>
              {t('listOfConsultant')}
            </Typography>
          </Box>
          <div style={{ display: 'flex' }}>
            <ConsultHistoryMobileTable
              titleTable={titleTableListConsultingHistoriesMobile}
              data={listConsultationHistories}
              loading={loading}
              startIndex={startIndex}
              handleDelete={handleDeleteConsultantHistory}
              successMessage={deleteConsultationHistorySuccessFlag}
            />
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <PaginationComponent totalPages={totalPages} handlePageChange={handlePageChange} reset={resetCurrentPage} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConsultantHistoryMobilePage
