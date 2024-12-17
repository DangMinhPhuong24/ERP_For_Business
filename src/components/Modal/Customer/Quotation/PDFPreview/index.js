import React, { useEffect, useState } from 'react'
import { Modal, Box, Backdrop, Fade, InputLabel, TextField } from '@mui/material'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import PDFComponent from '../../../../PDF/reportPDF'
import Typography from '@mui/material/Typography'
import QuotationTable from '../../../../Table/QuotationTable'
import colors from '../../../../../constants/colors'
import Button from '@mui/material/Button'
import { s3 } from '../../../../../utils/settingS3'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../../redux/app/app.slice'
import { createQuotationAction, createQuotationCatchAction } from '../../../../../redux/customer/customer.actions'
import { createQuotationCustomer, updateQuotation } from '../../../../../repositories/remote/service/customerService'

const style = {
  width: '60%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '800px',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

const PDFPreviewModal = ({
  open,
  handleClose,
  data,
  dataProduct,
  getProfile,
  createQuotationPreviewSuccessFlag,
  isEdit
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const now = new Date()
  const formattedDateTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}-${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`
  const filename = `bao-gia-linh-hieu-${formattedDateTime}.pdf`
  const [pdfLoading, setPdfLoading] = useState('')
  const [dataEditedDataPDF, setDataEditedDataPDF] = useState([])
  const [editedDataPDF, setEditedDataPDF] = useState([])
  const [startRender, setStartRender] = useState(false)
  const [blob, setBlob] = useState('')
  const [reason, setReason] = useState('')
  const [errorMessageReason, setErrorMessageReason] = useState('')

  useEffect(() => {
    const createPdfAndSetBlob = async () => {
      try {
        const pdfDoc = await pdf(
          <PDFComponent data={data} dataProduct={createQuotationPreviewSuccessFlag} getProfile={getProfile} />
        ).toBlob()
        setBlob(pdfDoc)
      } catch (error) {}
    }
    if (open) {
      createPdfAndSetBlob()
    }
  }, [open, data, editedDataPDF, getProfile])

  useEffect(() => {
    if (createQuotationPreviewSuccessFlag.warning !== '') {
      setReason(createQuotationPreviewSuccessFlag.reason_quotation)
    }
  }, [open, createQuotationPreviewSuccessFlag])

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
      if (isEdit) {
        const response = await updateQuotation({ reason: reason, file_path: filePath, ...dataProduct })
        setDataEditedDataPDF(response)
        dataEditedPDF = response
      } else {
        const response = await createQuotationCustomer({ reason: reason, file_path: filePath, ...dataProduct })
        setDataEditedDataPDF(response)
        dataEditedPDF = response
      }
    } catch (response) {
      message = response.response.data.message
      dispatch(createQuotationCatchAction(message))
    }
    setEditedDataPDF(createQuotationPreviewSuccessFlag)
    if (dataEditedPDF.data.warning === '') {
      if (pdfLoading === false) {
        setStartRender(true)
      }
    } else {
      dispatch(createQuotationAction(dataEditedPDF))
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

  const handleCloseModal = () => {
    setPdfLoading('')
    setErrorMessageReason('')
    setEditedDataPDF([])
    setDataEditedDataPDF([])
    setStartRender(false)
    handleClose()
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="order-container">
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
              <Box mt={4} sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('dateSent')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">
                      {createQuotationPreviewSuccessFlag.created_at}
                    </InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('dear')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.company_name}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('sender')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">
                      {createQuotationPreviewSuccessFlag.user?.name}
                    </InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('grandparents')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.customer_name}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">
                      {createQuotationPreviewSuccessFlag.user?.phone_number}
                    </InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.phone_number}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">
                      {createQuotationPreviewSuccessFlag.user?.email}
                    </InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.email}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Typography m="16px 0" className="content-quotation" textAlign="unset">
                {t('thanksQuotation')}:
              </Typography>
              <QuotationTable data={createQuotationPreviewSuccessFlag.product_management_quotation_history} />
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
            className="setPadding"
            sx={{
              position: 'sticky',
              bottom: '0',
              display: 'flex',
              justifyContent: 'flex-end',
              p: '8px 16px',
              bgcolor: colors.paleblueColor,
              zIndex: 1
            }}
          >
            <Box>
              <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                {t('back')}
              </Button>
              <PDFDownloadLink
                id="pdf-download-link"
                document={<PDFComponent data={data} dataProduct={editedDataPDF} getProfile={getProfile} />}
                fileName={filename}
              >
                {({ loading }) => {
                  setPdfLoading(loading)
                  return null
                }}
              </PDFDownloadLink>
              <Button variant="contained" className="confirmButton" onClick={handleSubmit}>
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
        </Box>
      </Fade>
    </Modal>
  )
}

export default PDFPreviewModal
