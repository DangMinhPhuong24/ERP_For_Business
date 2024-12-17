import React, { useEffect, useState } from 'react'
import { Box, InputLabel, TextField } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import PDFComponent from '../../../../../components/PDF/reportPDF'
import Typography from '@mui/material/Typography'
import QuotationTable from '../../../../../components/Table/QuotationTable'
import colors from '../../../../../constants/colors'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../../../redux/app/app.slice'
import {
  createQuotationAction,
  createQuotationCatchAction,
  createQuotationSuccessAction,
  getCustomerInformationAction
} from '../../../../../redux/customer/customer.actions'
import { createQuotationCustomer } from '../../../../../repositories/remote/service/customerService'
import {
  createQuotationPreviewSuccessFlagState,
  getCustomerDetailsState
} from '../../../../../redux/customer/customer.selectors'
import { useLocation, useNavigate } from 'react-router-dom'
import { s3 } from '../../../../../utils/settingS3'
import { getProfileState } from '../../../../../redux/auth/auth.selectors'
import Paper from '@mui/material/Paper'

const PreviewQuote = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const now = new Date()
  const customerDetail = useSelector(getCustomerDetailsState)
  const dataProduct = JSON.parse(localStorage.getItem('dataProduct'))
  const createQuotationPreviewSuccessFlag = useSelector(createQuotationPreviewSuccessFlagState)
  const getProfile = useSelector(getProfileState)

  const location = useLocation()
  const customerId = new URLSearchParams(location.search).get('id')

  const formattedDateTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}-${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`
  const filename = `bao-gia-linh-hieu-${formattedDateTime}.pdf`
  const [pdfLoading, setPdfLoading] = useState('')
  const [dataEditedDataPDF, setDataEditedDataPDF] = useState([])
  const [startRender, setStartRender] = useState(false)
  const [blob, setBlob] = useState('')
  const [reason, setReason] = useState('')
  const [errorMessageReason, setErrorMessageReason] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCustomerInformationAction({ id: customerId, from_date: '', to_date: '' }))
  }, [])

  useEffect(() => {
    const createPdfAndSetBlob = async () => {
      try {
        const pdfDoc = await pdf(
          <PDFComponent data={customerDetail} dataProduct={createQuotationPreviewSuccessFlag} getProfile={getProfile} />
        ).toBlob()
        setBlob(pdfDoc)
      } catch (error) {}
    }
    createPdfAndSetBlob()
  }, [customerDetail, getProfile])

  useEffect(() => {
    if (createQuotationPreviewSuccessFlag.warning !== '') {
      setReason(createQuotationPreviewSuccessFlag.reason_quotation)
    }
  }, [createQuotationPreviewSuccessFlag])

  useEffect(() => {
    if (pdfLoading === false && Object.keys(dataEditedDataPDF).length > 0 && startRender === true) {
      const pdfDownloadLink = document.getElementById('pdf-download-link')
      pdfDownloadLink.click()
      dispatch(createQuotationAction(dataEditedDataPDF))
      setStartRender(false)
      setPdfLoading('')
    }
  }, [pdfLoading])

  const handleSubmit = async () => {
    let dataEditedPDF
    let message = ''
    if (createQuotationPreviewSuccessFlag.warning !== '') {
      const isValid = validateData(reason)

      if (!isValid) {
        return
      }
    }
    dispatch(setLoading(true))
    const filePath = await handleUploadPDF()
    try {
      const response = await createQuotationCustomer({
        customer_id: customerId,
        effective_date: createQuotationPreviewSuccessFlag.effective_date,
        reason: reason,
        file_path: filePath,
        ...dataProduct
      })
      setDataEditedDataPDF(response)
      dataEditedPDF = response
      dispatch(createQuotationSuccessAction(response.message))
      navigate(`/sale/information/customer-detail?id=${customerId}`)
    } catch (response) {
      message = response.response.data.message
      dispatch(createQuotationCatchAction(message))
    }
    if (dataEditedPDF.data.warning === '') {
      if (pdfLoading === false) {
        setStartRender(true)
      }
    } else {
      dispatch(createQuotationAction(dataEditedPDF))
      dispatch(createQuotationSuccessAction(dataEditedPDF.data.warning))
      navigate(`/sale/information/customer-detail?id=${customerId}`)
    }
  }

  const validateData = (reason) => {
    let flag = true
    setErrorMessageReason('')

    if (!reason) {
      setErrorMessageReason(t('requiredField'))
      flag = false
    }
    return flag
  }

  const handleUploadPDF = async () => {
    const params = {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: filename,
      Body: blob,
      ContentType: 'application/pdf'
    }
    try {
      const data = await s3.upload(params).promise()
      return data.key
    } catch (error) {
      return null
    }
  }

  return (
    <Box
      component={Paper}
      className="order-container"
      sx={{ position: 'relative', minHeight: '100vh', width: '100vw' }}
    >
      <Box className="setPadding">
        <Box>
          {createQuotationPreviewSuccessFlag.warning === '' ? (
            <Typography className="title-detail-quotation">{t('tablePriceQuotation')}</Typography>
          ) : (
            <Typography className="title-detail-quotation">{t('proposalForQuotation')}</Typography>
          )}
          <Typography sx={{ fontSize: '10px', fontStyle: 'italic', textAlign: 'center', mt: 1 }}>
            ({t('applyDate')} {createQuotationPreviewSuccessFlag.effective_date})
          </Typography>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('dateSent')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">
                {createQuotationPreviewSuccessFlag.created_at}
              </InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('sender')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">
                {createQuotationPreviewSuccessFlag.user?.name}
              </InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">
                {createQuotationPreviewSuccessFlag.user?.phone_number}
              </InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">
                {createQuotationPreviewSuccessFlag.user?.email}
              </InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('dear')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">{customerDetail.company_name}</InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('grandparents')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">{customerDetail.customer_name}</InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">{customerDetail.phone_number}</InputLabel>
            </Box>
          </Box>
          <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box flex={0.5}>
              <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
            </Box>
            <Box flex={2}>
              <InputLabel className="content-quotation left-align-text">{customerDetail.email}</InputLabel>
            </Box>
          </Box>
          <Typography m="16px 0" className="content-quotation" textAlign="unset">
            {t('thanksQuotation')}:
          </Typography>
          <QuotationTable
            isMobile={true}
            data={createQuotationPreviewSuccessFlag.product_management_quotation_history}
          />
        </Box>
        {createQuotationPreviewSuccessFlag.warning !== '' && (
          <>
            <Box>
              <InputLabel required className="requiredTextField inputLabel-modal">
                {t('reasons')}
              </InputLabel>
              <TextField
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                error={errorMessageReason ? true : false}
                helperText={errorMessageReason ? errorMessageReason : ''}
                fullWidth
                multiline
                placeholder={t('pleaseEnterReason')}
                rows={3}
                InputProps={{
                  classes: {
                    root: 'custom-input-search'
                  }
                }}
              />
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0',
          display: 'flex',
          width: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          justifyContent: 'center',
          p: '8px 16px',
          bgcolor: colors.paleblueColor,
          zIndex: 1
        }}
      >
        <Button variant="outlined" onClick={() => navigate(-1)} className="cancelButton">
          {t('back')}
        </Button>
        <Button variant="contained" className="confirmButtonGlobal" onClick={handleSubmit}>
          {createQuotationPreviewSuccessFlag.warning === '' ? (
            <>
              {t('pDFexport')} <FaArrowRightLong />
            </>
          ) : (
            <>
              {t('submitSuggestions')} <FaArrowRightLong />
            </>
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default PreviewQuote
