import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { InputLabel } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import colors from '../../../../constants/colors'
import '../../../../resource/style/ModalClaimStyle.css'

import RefuseIcon from '../../../../asset/icon/Refuse.svg'
import selectedCase from '../../../../constants/selectedCase'
import QuotatonTable from '../../../Table/QuotationTable'

export default function QuotationDetailModal({
  open,
  nameTitle,
  handleCloseModal,
  data,
  handleSuccess,
  handleCancelModal,
  isEdit
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '800px',
    maxHeight: '94vh',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto'
  }
  const { t } = useTranslation()
  const handleSubmit = () => {
    handleSuccess()
  }
  const handleCancel = () => {
    handleCancelModal()
  }

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={style}>
          <Typography component="p" className="claim-title">
            {nameTitle}
          </Typography>
          <Box sx={{ p: '0 16px 25px 16px', mt: '48px' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '35px' }}>
              <Box flex={1}>
                <InputLabel className="inputLabel-modal">{t('customerName')}</InputLabel>
              </Box>
              <Box flex={4}>
                <Typography className="typography-propose" component="p">
                  {data.customer?.customer_name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '35px' }}>
              <Box flex={1}>
                <InputLabel className="inputLabel-modal">{t('proposer')}</InputLabel>
              </Box>
              <Box flex={4}>
                <Typography className="typography-propose" component="p">
                  {data.user?.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '35px' }}>
              <Box flex={1}>
                <InputLabel className="inputLabel-modal">{t('timeQuotation')}</InputLabel>
              </Box>
              <Box flex={4}>
                <Typography className="typography-propose" component="p">
                  {data.created_at}
                </Typography>
              </Box>
            </Box>
            {data.reason_quotation ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '35px' }}>
                <Box flex={1}>
                  <InputLabel className="inputLabel-modal">{t('reasons')}</InputLabel>
                </Box>
                <Box flex={4}>
                  <Typography className="typography-propose" component="p">
                    {data.reason_quotation}
                  </Typography>
                </Box>
              </Box>
            ) : null}
            {/*-----------------------------------------------------------------------------*/}
            <Box mt={5}>
              <Typography className="title-detail-quotation">{t('tablePriceQuotation')}</Typography>
              <Typography sx={{ fontSize: '10px', fontStyle: 'italic', textAlign: 'center', mt: 1 }}>
                ({t('applyDate')} {data.effective_date})
              </Typography>
              <Box mt={4} sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('dateSent')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.created_at}</InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('dear')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.customer?.company_name}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('sender')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.user?.name}</InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('grandparents')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.customer?.customer_name}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.user?.phone_number}</InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('phone')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.customer?.phone_number}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.user?.email}</InputLabel>
                  </Box>
                </Box>
                <Box flex={1} sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box flex={0.5}>
                    <InputLabel className="title-quotation">{t('Email')}:</InputLabel>
                  </Box>
                  <Box flex={2}>
                    <InputLabel className="content-quotation">{data.customer?.email}</InputLabel>
                  </Box>
                </Box>
              </Box>
              <Typography m="16px 0" className="content-quotation" textAlign="unset">
                {t('thanksQuotation')}:
              </Typography>
              <QuotatonTable data={data.product_management_quotation_history} />
              {data.warning ? (
                <p style={{ marginTop: '8px', textAlign: 'center', color: colors.redColor }}>{data.warning}</p>
              ) : (
                ''
              )}
            </Box>
            {!(
              data.proposal_status?.id === selectedCase.pending || data.proposal_status?.id === selectedCase.approved
            ) ? (
              <Box sx={{ display: 'flex', gap: '35px', mt: '21px', alignItems: 'baseline' }}>
                <Box flex={1}>
                  <InputLabel className="inputLabel-modal">{t('reasons')}</InputLabel>
                </Box>
                <Box flex={2}>
                  <Typography className="typography-propose" component="p">
                    {data.reason_refusal}
                  </Typography>
                </Box>
              </Box>
            ) : null}
          </Box>
          {data.proposal_status?.id === 1 && isEdit !== true && (
            <Box
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
              <Button onClick={handleCancel} className="cancelButton">
                {t('refuse')}
                <RefuseIcon />
              </Button>
              <Button variant="contained" onClick={handleSubmit} className="confirmButton">
                {t('accept')}
                <ArrowForwardIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
