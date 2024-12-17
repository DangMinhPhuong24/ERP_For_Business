import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HeaderPage from 'components/HeaderPage'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import PolygonIcon from '../../asset/icon/Polygon.svg'
import CustomDateRangePicker from '../../components/DateTime/DateRangePicker'
import QuotationDetailModal from '../../components/Modal/Customer/QuotationDetail'
import DebtAgeModal from '../../components/Modal/Proposed/DebtAge'
import RefuseModal from '../../components/Modal/Proposed/DebtAge/Refuse'
import DebtAgeTable from '../../components/Table/Proposed/DebtAgeTable'
import QuotesTable from '../../components/Table/Proposed/QuotesTable'
import colors from '../../constants/colors'
import commons from '../../constants/common'
import {
  getAllProposalStatusAction,
  getDetailProposalDebtAgeAction,
  getDetailProposalPurchaseOrderAction,
  getDetailProposalQuotationAction,
  getListProposalDebtAgeAction,
  getListProposalPurchaseOrderAction,
  getListProposalQuotationAction,
  getStatisticProposalAction,
  updateApproveProposalDebtAgeAction,
  updateApproveProposalPurchaseOrderAction,
  updateApproveProposalQuotationAction
} from '../../redux/proposal/proposal.actions'
import {
  detailProposalPurchaseOrderState,
  listAllProposalStatusState,
  listDetailProposalDebtAgeState,
  listDetailProposalQuotationState,
  listProposalPurchaseOrderState,
  listStatisticProposalState,
  proposalDebtAgeListState,
  proposalQuotationListState,
  totalPagesProposalDebtAgeListState,
  totalPagesPurchaseOrderListState,
  totalPagesQuotationListState,
  updateApproveProposalDebtAgeSuccessFlagState, updateApproveProposalPurchaseOrderFlagState,
  updateApproveProposalQuotationSuccessFlagState
} from '../../redux/proposal/proposal.selectors'
import SearchBar from "../../components/Buttons/Search";
import PurchaseProposalTable from "../../components/Table/Proposed/PurchaseProposalTable";
import PurchaseProposalModal from "../../components/Modal/Proposed/PurchaseProposalModal";

function ProposedPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const quotationHistoryId = new URLSearchParams(location.search).get(commons.QUOTATION_HISTORY_ID)
  const debtAgeId = new URLSearchParams(location.search).get(commons.DEBT_AGE_ID)
  const [valueTabs, setValueTabs] = useState('1')
  const [isOpenDebtAgeModal, setIsOpenDebtAgeModal] = useState(false)
  const [isOpenPurchaseOrderDetailModal, setIsOpenPurchaseOrderDetailModal] = useState(false)
  const [isOpenRefuseModal, setIsOpenRefuseModal] = useState(false)
  const proposalDebtAgeList = useSelector(proposalDebtAgeListState)
  const proposalQuotationList = useSelector(proposalQuotationListState)
  const totalPagesProposalDebtAgeList = useSelector(totalPagesProposalDebtAgeListState)
  const [selectedRangeListProposalQuotation, setSelectedRangeListProposalQuotation] = useState([])
  const [selectedRangeListProposalDebtAge, setSelectedRangeListProposalDebtAge] = useState([])
  const [selectedRangeListProposalPurchaseOrder, setSelectedRangeListProposalPurchaseOrder] = useState([])
  const totalPagesQuotationList = useSelector(totalPagesQuotationListState)
  const totalPagesPurchaseOrderList = useSelector(totalPagesPurchaseOrderListState)
  const listAllProposalStatus = useSelector(listAllProposalStatusState)
  const listStatisticProposal = useSelector(listStatisticProposalState)
  const listProposalPurchaseOrder = useSelector(listProposalPurchaseOrderState)
  const detailProposalPurchaseOrder = useSelector(detailProposalPurchaseOrderState)
  const [loading, setLoading] = useState(false)
  const [statusId, setStatusId] = useState(null)
  const [statusIdInQuotation, setStatusIdInQuotation] = useState(null)
  const [customerNameInDebtAge, setCustomerNameInDebtAge] = useState('')
  const [orderNameInPurchaseOrder, setOrderNameInPurchaseOrder] = useState('')
  const [customerNameInQuotation, setCustomerNameInQuotation] = useState('')
  const listDetailProposalDebtAge = useSelector(listDetailProposalDebtAgeState)
  const updateApproveProposalDebtAgeSuccessFlag = useSelector(updateApproveProposalDebtAgeSuccessFlagState)
  const updateApproveProposalPurchaseOrderFlag = useSelector(updateApproveProposalPurchaseOrderFlagState)
  const [isOpenDetailQuotation, setIsOpenDetailQuotation] = useState(false)
  const listDetailProposalQuotation = useSelector(listDetailProposalQuotationState)
  const updateApproveProposalQuotationSuccessFlag = useSelector(updateApproveProposalQuotationSuccessFlagState)
  const [isOpenRefuseQuotationModal, setIsOpenRefuseQuotationModal] = useState(false)
  const [isOpenRefusePurchaseOrderModal, setIsOpenRefusePurchaseOrderModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    if (quotationHistoryId) {
      setValueTabs('1')
      dispatch(getDetailProposalQuotationAction({ id: quotationHistoryId }))
      setIsOpenDetailQuotation(true)
    } else if (debtAgeId) {
      setValueTabs('2')
      dispatch(getDetailProposalDebtAgeAction({ id: debtAgeId }))
      setIsOpenDebtAgeModal(true)
    }
  }, [quotationHistoryId, dispatch, debtAgeId])

  useEffect(() => {
    if (statusId || selectedRangeListProposalDebtAge ||
      statusIdInQuotation || selectedRangeListProposalQuotation ||
      selectedRangeListProposalPurchaseOrder)
    {
      handleFind()
    }
  }, [
    statusId,
    selectedRangeListProposalDebtAge,
    statusIdInQuotation,
    selectedRangeListProposalQuotation,
    selectedRangeListProposalPurchaseOrder,
  ])

  useEffect(() => {
    if (updateApproveProposalDebtAgeSuccessFlag) {
      dispatch(getListProposalDebtAgeAction())
      dispatch(getStatisticProposalAction())
      setIsOpenDebtAgeModal(false)
      setIsOpenRefuseModal(false)
    }
  }, [updateApproveProposalDebtAgeSuccessFlag])

  useEffect(() => {
    if (updateApproveProposalQuotationSuccessFlag) {
      dispatch(getListProposalQuotationAction())
      dispatch(getStatisticProposalAction())
      setIsOpenDetailQuotation(false)
      setIsOpenRefuseQuotationModal(false)
    }
  }, [updateApproveProposalQuotationSuccessFlag])

  useEffect(() => {
    if (updateApproveProposalPurchaseOrderFlag) {
      dispatch(getListProposalPurchaseOrderAction())
      dispatch(getStatisticProposalAction())
      setIsOpenPurchaseOrderDetailModal(false)
      setIsOpenRefusePurchaseOrderModal(false)
    }
  }, [updateApproveProposalPurchaseOrderFlag])

  useEffect(() => {
    dispatch(getAllProposalStatusAction())
    dispatch(getStatisticProposalAction())
  }, [])

  const handleOpenRefuseQuotationModal = () => {
    setIsOpenDetailQuotation(false)
    setIsOpenRefuseQuotationModal(true)
  }

  const handleCloseRefuseQuotationModal = () => {
    setIsOpenDetailQuotation(true)
    setIsOpenRefuseQuotationModal(false)
  }

  const handleChangeTabs = useCallback(
    (event, newValueTabs) => {
      setValueTabs(newValueTabs)
      setLoading(true)
      if (newValueTabs == 1) {
        setCurrentPage(1)
        dispatch(
          getListProposalQuotationAction({
            customer_name: customerNameInQuotation,
            proposal_status_id: statusIdInQuotation,
            from_date: selectedRangeListProposalQuotation[0],
            to_date: selectedRangeListProposalQuotation[1]
          })
        ).then(() => {
          setLoading(false)
        })
      } else if(newValueTabs == 2) {
        setCurrentPage(1)
        dispatch(
          getListProposalDebtAgeAction({
            customer_name: customerNameInDebtAge,
            proposal_status_id: statusId,
            from_date: selectedRangeListProposalDebtAge[0],
            to_date: selectedRangeListProposalDebtAge[1]
          })
        ).then(() => {
          setLoading(false)
        })
      } else{
        setCurrentPage(1)
        dispatch(
          getListProposalPurchaseOrderAction({
            search: orderNameInPurchaseOrder,
            from_date: selectedRangeListProposalPurchaseOrder[0],
            to_date: selectedRangeListProposalPurchaseOrder[1]
          })
        ).then(() => {
          setLoading(false)
        })
      }
    },[ valueTabs ]
  )

  const handleFind = () => {
    setLoading(true)
    if (valueTabs == 1) {
      setCurrentPage(1)
      dispatch(
        getListProposalQuotationAction({
          customer_name: customerNameInQuotation,
          proposal_status_id: statusIdInQuotation,
          from_date: selectedRangeListProposalQuotation[0],
          to_date: selectedRangeListProposalQuotation[1]
        })
      ).then(() => {
        setLoading(false)
      })
    } else if(valueTabs == 2) {
      setCurrentPage(1)
      dispatch(
        getListProposalDebtAgeAction({
          customer_name: customerNameInDebtAge,
          proposal_status_id: statusId,
          from_date: selectedRangeListProposalDebtAge[0],
          to_date: selectedRangeListProposalDebtAge[1]
        })
      ).then(() => {
        setLoading(false)
      })
    } else{
      setCurrentPage(1)
      dispatch(
        getListProposalPurchaseOrderAction({
          search: orderNameInPurchaseOrder,
          from_date: selectedRangeListProposalPurchaseOrder[0],
          to_date: selectedRangeListProposalPurchaseOrder[1]
        })
      ).then(() => {
        setLoading(false)
      })
    }
  }

  const handleClearSearch = () => {
    if (valueTabs == 1) {
      setCustomerNameInQuotation('')
      setLoading(true)
      dispatch(
        getListProposalQuotationAction({
          customer_name: '',
          proposal_status_id: statusIdInQuotation,
          from_date: selectedRangeListProposalQuotation[0],
          to_date: selectedRangeListProposalQuotation[1]
        })
      ).then(() => {
        setLoading(false)
      })
    } else if(valueTabs == 2) {
      setCustomerNameInDebtAge('')
      setLoading(true)
      dispatch(
        getListProposalDebtAgeAction({
          customer_name: '',
          proposal_status_id: statusId,
          from_date: selectedRangeListProposalDebtAge[0],
          to_date: selectedRangeListProposalDebtAge[1]
        })
      ).then(() => {
        setLoading(false)
      })
    } else{
      setOrderNameInPurchaseOrder('')
      setLoading(true)
      dispatch(
        getListProposalPurchaseOrderAction({
          search: '',
          from_date: selectedRangeListProposalPurchaseOrder[0],
          to_date: selectedRangeListProposalPurchaseOrder[1]
        })
      ).then(() => {
        setLoading(false)
      })
    }
  }

  const handleDateRangeChangeListProposalQuotation = (range) => {
    setSelectedRangeListProposalQuotation(range)
  }
  const handleDateRangeChangeListProposalDebtAge = (range) => {
    setSelectedRangeListProposalDebtAge(range)
  }
  const handleDateRangeChangeListProposalPurchaseOrder = (range) => {
    setSelectedRangeListProposalPurchaseOrder(range)
  }
  const handleOpenDebtAgeModal = (Id) => {
    dispatch(getDetailProposalDebtAgeAction({ id: Id }))
    setIsOpenDebtAgeModal(true)
  }
  const handleCloseDebtAgeModal = () => {
    setIsOpenDebtAgeModal(false)
  }

  const handleOpenPurchaseOrderModal = (Id) => {
    dispatch(getDetailProposalPurchaseOrderAction( Id ))
    setIsOpenPurchaseOrderDetailModal(true)
  }
  const handleClosePurchaseOrderModal = () => {
    setIsOpenPurchaseOrderDetailModal(false)
  }

  const handleOpenRefuseModal = () => {
    setIsOpenDebtAgeModal(false)
    setIsOpenRefuseModal(true)
  }

  const handleCloseRefuseModal = () => {
    setIsOpenRefuseModal(false)
    setIsOpenDebtAgeModal(true)
  }

  const handleOpenRefusePurchaseOrderModal = () => {
    setIsOpenPurchaseOrderDetailModal(false)
    setIsOpenRefusePurchaseOrderModal(true)
  }

  const handleCloseRefusePurchaseOrderModal = () => {
    setIsOpenRefusePurchaseOrderModal(false)
    setIsOpenPurchaseOrderDetailModal(true)
  }

  const handlePageChangeListProposalDebtAge = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(
      getListProposalDebtAgeAction({
        customer_name: customerNameInDebtAge,
        proposal_status_id: statusId,
        page,
        from_date: selectedRangeListProposalDebtAge[0],
        to_date: selectedRangeListProposalDebtAge[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const handlePageChangeListProposalQuotation = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(
      getListProposalQuotationAction({
        customer_name: customerNameInQuotation,
        proposal_status_id: statusIdInQuotation,
        page,
        from_date: selectedRangeListProposalQuotation[0],
        to_date: selectedRangeListProposalQuotation[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const handlePageChangeListProposalPurchaseOrder = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(
      getListProposalPurchaseOrderAction({
        search: orderNameInPurchaseOrder,
        page,
        from_date: selectedRangeListProposalPurchaseOrder[0],
        to_date: selectedRangeListProposalPurchaseOrder[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleSuccessProposalQuotation = useCallback(() => {
    dispatch(
      updateApproveProposalQuotationAction({
        id: listDetailProposalQuotation.id,
        proposal_status_id: 2,
        reason: ''
      })
    )
  }, [listDetailProposalQuotation])

  const handleRejectProposalQuotation = useCallback(
    (reason) => {
      dispatch(
        updateApproveProposalQuotationAction({
          id: listDetailProposalQuotation.id,
          proposal_status_id: 3,
          reason: reason.reason
        })
      )
    },
    [listDetailProposalQuotation]
  )

  const handleSuccessProposalDebtAge = useCallback(() => {
    dispatch(
      updateApproveProposalDebtAgeAction({
        id: listDetailProposalDebtAge.id,
        proposal_status_id: 2,
        reason: ''
      })
    )
  }, [listDetailProposalDebtAge])

  const handleRejectProposalDebtAge = useCallback(
    (reason) => {
      dispatch(
        updateApproveProposalDebtAgeAction({
          id: listDetailProposalDebtAge.id,
          proposal_status_id: 3,
          reason: reason.reason
        })
      )
    },
    [listDetailProposalDebtAge]
  )

  const handleSuccessProposalPurchaseOrder = useCallback(() => {
    dispatch(
      updateApproveProposalPurchaseOrderAction({
        id: detailProposalPurchaseOrder.id,
        purchase_order_status_id: 2,
        reason: ''
      })
    )
  }, [detailProposalPurchaseOrder])

  const handleRejectProposalPurchaseOrder = useCallback(
    (reason) => {
      dispatch(
        updateApproveProposalPurchaseOrderAction({
          id: detailProposalPurchaseOrder.id,
          purchase_order_status_id: 7,
          reason: reason.reason
        })
      )
    },
    [detailProposalPurchaseOrder]
  )

  const handleDetailQuotationModal = (quotationId) => {
    dispatch(getDetailProposalQuotationAction({ id: quotationId }))
    setIsOpenDetailQuotation(true)
  }
  const handleCloseDetailQuotationModal = () => {
    setIsOpenDetailQuotation(false)
  }

  return (
    <>
      <HeaderPage title={t('proposedManagement')} />

      <Box
        component="form"
        sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 2, position: 'relative', m: 2 }}
      >
        <Box>
          <Typography className="frontpager">{t('proposedList')}</Typography>
        </Box>
        <TabContext value={valueTabs}>
          <Box
            sx={{
              width: '100%',
              borderBottom: 1,
              borderColor: 'divider',
              mt: '12px'
            }}
          >
            <TabList
              onChange={handleChangeTabs}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '30px !important'
              }}
            >
              <Tab
                className="button-tabs"
                sx={{ fontSize: '14px' }}
                label={
                  <Grid container columnSpacing={1}>
                    <Grid item>
                      <Typography variant="span">{t('quotes')}</Typography>
                    </Grid>
                    {listStatisticProposal.quantity_proposal_quotation_waiting_approval > 0 && (
                      <Grid item>
                        <Typography
                          variant="span"
                          sx={{
                            bgcolor: colors.lilywhiteColor,
                            color: colors.redColor,
                            p: '2px 5px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            lineHeight: '15.18px'
                          }}
                        >
                          {listStatisticProposal.quantity_proposal_quotation_waiting_approval}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                }
                value="1"
              />
              <Tab
                className="button-tabs"
                sx={{ fontSize: '14px' }}
                label={
                  <Grid container columnSpacing={1}>
                    <Grid item>
                      <Typography variant="span">{t('debtAge')}</Typography>
                    </Grid>
                    {listStatisticProposal.quantity_proposal_debt_age_waiting_approval > 0 && (
                      <Grid item>
                        <Typography
                          variant="span"
                          sx={{
                            bgcolor: colors.lilywhiteColor,
                            color: colors.redColor,
                            p: '2px 5px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            lineHeight: '15.18px'
                          }}
                        >
                          {listStatisticProposal.quantity_proposal_debt_age_waiting_approval}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                }
                value="2"
              />
              <Tab
                className="button-tabs"
                sx={{ fontSize: '14px' }}
                label={
                  <Grid container columnSpacing={1}>
                    <Grid item>
                      <Typography variant="span">{t('purchase')}</Typography>
                    </Grid>
                    {listStatisticProposal.quantity_purchase_order_waiting > 0 && (
                      <Grid item>
                        <Typography
                          variant="span"
                          sx={{
                            bgcolor: colors.lilywhiteColor,
                            color: colors.redColor,
                            p: '2px 5px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            lineHeight: '15.18px'
                          }}
                        >
                          {listStatisticProposal.quantity_purchase_order_waiting}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                }
                value="3"
              />
            </TabList>
          </Box>
          {/*------------------------------------------Tab-Panel-1----------------------------------------*/}
          <TabPanel sx={{ padding: '0' }} value="1">
            <Box
              sx={{
                mt: '26px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchBar
                  searchValue={customerNameInQuotation}
                  handleOnChangeValue={(e) => setCustomerNameInQuotation(e.target.value)}
                  handleSearch={handleFind}
                  handleClearSearch={handleClearSearch}
                  placeholderText="enterCustomerName"
                  buttonText="find"
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  popupIcon={<PolygonIcon />}
                  size="small"
                  className="autocomplete-container"
                  options={listAllProposalStatus}
                  value={listAllProposalStatus.find((option) => option.id === statusIdInQuotation) || null}
                  onChange={(event, value) => setStatusIdInQuotation(value ? value.id : '')}
                  getOptionLabel={(option) => option.proposal_status_name}
                  renderInput={(params) => <TextField {...params} placeholder={t('status')} variant="outlined" />}
                  ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                  classes={{ inputRoot: 'custom-input-search' }}
                />
                <CustomDateRangePicker
                  dataStatisticProposal={listStatisticProposal}
                  onChange={handleDateRangeChangeListProposalQuotation}
                  noDisplayLabel={true}
                />
              </Box>
            </Box>
            <Box component="form" mt={2}>
              <Box>
                <QuotesTable
                  data={proposalQuotationList}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPagesQuotationList}
                  navigateToDetail={handleDetailQuotationModal}
                  handlePageChange={handlePageChangeListProposalQuotation}
                />
                <QuotationDetailModal
                  open={isOpenDetailQuotation}
                  data={listDetailProposalQuotation}
                  nameTitle={t('acceptTheProposalQuotation')}
                  handleCloseModal={handleCloseDetailQuotationModal}
                  handleSuccess={handleSuccessProposalQuotation}
                  handleCancelModal={handleOpenRefuseQuotationModal}
                />
                <RefuseModal
                  open={isOpenRefuseQuotationModal}
                  nameTitle={t('refuseProposal')}
                  handleCloseModal={handleCloseRefuseQuotationModal}
                  handleUpdate={handleRejectProposalQuotation}
                />
              </Box>
            </Box>
          </TabPanel>
          {/*------------------------------------------Tab-Panel-2----------------------------------------*/}
          <TabPanel sx={{ padding: '0' }} value="2">
            <Box
              sx={{
                mt: '26px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchBar
                  searchValue={customerNameInDebtAge}
                  handleOnChangeValue={(e) => setCustomerNameInDebtAge(e.target.value)}
                  handleSearch={handleFind}
                  handleClearSearch={handleClearSearch}
                  placeholderText="enterCustomerName"
                  buttonText="find"
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  popupIcon={<PolygonIcon />}
                  size="small"
                  className="autocomplete-container"
                  options={listAllProposalStatus}
                  value={listAllProposalStatus.find((option) => option.id === statusId) || null}
                  onChange={(event, value) => setStatusId(value ? value.id : '')}
                  getOptionLabel={(option) => option.proposal_status_name}
                  renderInput={(params) => <TextField {...params} placeholder={t('status')} variant="outlined" />}
                  ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                  classes={{ inputRoot: 'custom-input-search' }}
                />
                <CustomDateRangePicker
                  dataStatisticProposal={listStatisticProposal}
                  onChange={handleDateRangeChangeListProposalDebtAge}
                  noDisplayLabel={true}
                />
              </Box>
            </Box>
            <Box component="form" mt={2}>
              <Box>
                <DebtAgeTable
                  data={proposalDebtAgeList}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPagesProposalDebtAgeList}
                  navigateToDetail={handleOpenDebtAgeModal}
                  handlePageChange={handlePageChangeListProposalDebtAge}
                />
                <DebtAgeModal
                  open={isOpenDebtAgeModal}
                  nameTitle={t('acceptTheProposalOnDebtAge')}
                  handleCloseModal={handleCloseDebtAgeModal}
                  data={listDetailProposalDebtAge}
                  handleSuccess={handleSuccessProposalDebtAge}
                  handleCancelModal={handleOpenRefuseModal}
                />
                <RefuseModal
                  open={isOpenRefuseModal}
                  nameTitle={t('refuseProposal')}
                  handleCloseModal={handleCloseRefuseModal}
                  handleUpdate={handleRejectProposalDebtAge}
                />
              </Box>
            </Box>
          </TabPanel>
          {/*------------------------------------------Tab-Panel-3----------------------------------------*/}
          <TabPanel sx={{ padding: '0' }} value="3">
            <Box
              sx={{
                mt: '26px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchBar
                  searchValue={orderNameInPurchaseOrder}
                  handleOnChangeValue={(e) => setOrderNameInPurchaseOrder(e.target.value)}
                  handleSearch={handleFind}
                  handleClearSearch={handleClearSearch}
                  placeholderText="enterOrderCode"
                  buttonText="find"
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <CustomDateRangePicker
                  dataStatisticProposal={listStatisticProposal}
                  onChange={handleDateRangeChangeListProposalPurchaseOrder}
                  noDisplayLabel={true}
                />
              </Box>
            </Box>
            <Box component="form" mt={2}>
              <Box>
                <PurchaseProposalTable
                  data={listProposalPurchaseOrder}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPagesPurchaseOrderList}
                  navigateToDetail={handleOpenPurchaseOrderModal}
                  handlePageChange={handlePageChangeListProposalPurchaseOrder}
                />
                <PurchaseProposalModal
                  open={isOpenPurchaseOrderDetailModal}
                  nameTitle={t('acceptPurchaseProposal')}
                  handleCloseModal={handleClosePurchaseOrderModal}
                  data={detailProposalPurchaseOrder}
                  dataTable={detailProposalPurchaseOrder.purchase_order_product || []}
                  handleSuccess={handleSuccessProposalPurchaseOrder}
                  handleCancelModal={handleOpenRefusePurchaseOrderModal}
                />
                <RefuseModal
                  open={isOpenRefusePurchaseOrderModal}
                  nameTitle={t('refuseProposal')}
                  handleCloseModal={handleCloseRefusePurchaseOrderModal}
                  handleUpdate={handleRejectProposalPurchaseOrder}
                />
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default ProposedPage
